// ── FOOD INDEX ───────────────────────────────────────────────────────────────
var FOOD_INDEX = FOOD_DB.map(function(f){
  return {name:f[0],kcal:f[1],p:f[2],c:f[3],fat:f[4],fiber:f[5]||0,cat:f[6],
    search:f[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')};
});

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
var PASTI=[
  {id:'colazione',nome:'Colazione',ora:'07:30',emoji:'☕',bg:'#FAEEDA'},
  {id:'spuntino_m',nome:'Spuntino mat.',ora:'10:30',emoji:'🍎',bg:'#EAF3DE'},
  {id:'pranzo',nome:'Pranzo',ora:'13:00',emoji:'🍽️',bg:'#E6F1FB'},
  {id:'merenda',nome:'Merenda',ora:'16:30',emoji:'🥜',bg:'#EEEDFE'},
  {id:'cena',nome:'Cena',ora:'19:30',emoji:'🌙',bg:'#FAECE7'}
];
var GG=['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
var GG_E=['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
var MM=['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
var TIPS=[
  "Bevi almeno 2 litri d'acqua distribuiti tra i pasti.",
  "Mastica lentamente: il cervello impiega 20 minuti a registrare la sazietà.",
  "Verdure a foglia verde ad ogni pasto: fibra, vitamine e pochissime calorie.",
  "Non saltare la colazione: avvia il metabolismo per tutta la giornata.",
  "Pianifica i pasti la sera prima per evitare scelte impulsive.",
  "Il riposo fa parte della dieta: dormi 7-8 ore per ottimizzare il metabolismo.",
  "Proteine ad ogni pasto: aumentano la sazietà e preservano la massa muscolare."
];

// ── STORAGE ───────────────────────────────────────────────────────────────────
var K_SESSION='nd_session_v4';
function getSession(){try{return JSON.parse(localStorage.getItem(K_SESSION)||'null');}catch(e){return null;}}
function saveSession(s){localStorage.setItem(K_SESSION,JSON.stringify(s));}
function clearSession(){localStorage.removeItem(K_SESSION);}

// ── IN-MEMORY CACHE ───────────────────────────────────────────────────────────
var _patients=[];
var _checkins={};
var _unsubscribePatients=null;

function getAllPatients(){return _patients;}
function getPatientsOf(nutriId){return _patients.filter(function(p){return p.nutriId===nutriId;});}
function getPatientById(id){return _patients.find(function(p){return p.id===id;})||null;}
function getPatientByCode(code){return _patients.find(function(p){return p.codice===code.trim().toUpperCase();})||null;}
function getCheckins(){try{return JSON.parse(localStorage.getItem('nd_checkins')||'{}');}catch(e){return{};}}
function saveCheckins(c){localStorage.setItem('nd_checkins',JSON.stringify(c));}

// ── FIRESTORE HELPERS ─────────────────────────────────────────────────────────
async function fsGet(col,id){var snap=await db.collection(col).doc(id).get();return snap.exists?Object.assign({id:snap.id},snap.data()):null;}
async function fsSet(col,id,data){await db.collection(col).doc(id).set(data,{merge:true});}
async function fsDelete(col,id){await db.collection(col).doc(id).delete();}
async function loadNutriAccounts(){var snap=await db.collection('nutrizionisti').get();return snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});}
async function loadPatientByCode(code){
  var snap=await db.collection('pazienti').where('codice','==',code.trim().toUpperCase()).get();
  if(snap.empty)return null;
  var d=snap.docs[0];return Object.assign({id:d.id},d.data());
}
async function startPatientsListener(nutriId,onUpdate){
  if(_unsubscribePatients)_unsubscribePatients();
  _unsubscribePatients=db.collection('pazienti').where('nutriId','==',nutriId).onSnapshot(function(snap){
    _patients=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
    onUpdate();
  },function(err){console.error('Listener error:',err);});
}
async function startPatientListener(patId,onUpdate){
  if(_unsubscribePatients)_unsubscribePatients();
  _unsubscribePatients=db.collection('pazienti').doc(patId).onSnapshot(function(snap){
    if(!snap.exists)return;
    var updated=Object.assign({id:snap.id},snap.data());
    var idx=_patients.findIndex(function(p){return p.id===patId;});
    if(idx>=0)_patients[idx]=updated;else _patients=[updated];
    onUpdate();
  },function(err){console.error('Listener error:',err);});
}
async function updatePatient(pat){
  var i=_patients.findIndex(function(p){return p.id===pat.id;});
  if(i>=0)_patients[i]=pat;else _patients.push(pat);
  try{await fsSet('pazienti',pat.id,pat);}catch(e){showToast('⚠️ Errore salvataggio: '+e.message,3000);}
}

// ── UTILS ─────────────────────────────────────────────────────────────────────
function r(v,dec){dec=dec||0;return dec?Math.round(v*Math.pow(10,dec))/Math.pow(10,dec):Math.round(v);}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function hashPass(s){var h=5381;for(var i=0;i<s.length;i++)h=(h*33^s.charCodeAt(i))>>>0;return h.toString(36);}
function genCode(nome){var n=(nome||'PAZ').toUpperCase().replace(/\s+/g,'-').slice(0,8);return n+'-'+Math.floor(1000+Math.random()*9000);}
function showToast(msg,dur){dur=dur||2500;var t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},dur);}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');closeSugg();}
function getDate(i){var d=new Date(),cur=d.getDay()===0?6:d.getDay()-1;d.setDate(d.getDate()-cur+i);return d;}
function todayIdx(){var d=new Date().getDay();return d===0?6:d-1;}
function getDietaKey(patient){
  // Returns 'A' or 'B' based on current week
  var cfg=patient.configAB||{};
  if(!cfg.enabled) return 'A';
  var start=cfg.startDate?new Date(cfg.startDate):new Date();
  var now=new Date();
  var weeksDiff=Math.floor((now-start)/(7*24*60*60*1000));
  return weeksDiff%2===0?'A':'B';
}
function isDietaABActive(patient, weekOffset){
  // Returns false if the A/B diet has expired for this weekOffset
  var cfg=patient.configAB||{};
  if(!cfg.enabled) return false;
  if(!cfg.startDate) return false;
  if(!cfg.durata || cfg.durata===0) return true; // illimitata
  var start=new Date(cfg.startDate);
  var now=new Date();
  var baseWeeks=Math.floor((now-start)/(7*24*60*60*1000));
  var targetWeeks=baseWeeks+weekOffset;
  // Se targetWeeks < 0 (prima dell'inizio) o >= durata (dopo la fine) → non attiva
  if(targetWeeks < 0 || targetWeeks >= cfg.durata) return false;
  return true;
}
function getDietaForWeek(patient, weekOffset){
  weekOffset = weekOffset || 0;
  var cfg=patient.configAB||{};
  if(!cfg.enabled || !isDietaABActive(patient, weekOffset)){
    return patient.dieta||{giorni:{}};
  }
  var start=cfg.startDate?new Date(cfg.startDate):new Date();
  var now=new Date();
  var baseWeeks=Math.floor((now-start)/(7*24*60*60*1000));
  var targetWeeks=baseWeeks+weekOffset;
  var key=targetWeeks%2===0?'A':'B';
  return (key==='A'?patient.dietaA:patient.dietaB)||patient.dieta||{giorni:{}};
}
function getTotals(patient,idx,weekOffset){
  weekOffset=weekOffset||0;
  var dieta=getDietaForWeek(patient,weekOffset);
  var g=(dieta.giorni||{})[idx]||{};
  var kcal=0,p=0,c=0,f=0,fi=0;
  PASTI.forEach(function(pm){(g[pm.id]||[]).forEach(function(food){kcal+=food.kcal||0;p+=food.p||0;c+=food.c||0;f+=food.fat||food.f||0;fi+=food.fi||0;});});
  return{kcal:r(kcal),p:r(p,1),c:r(c,1),f:r(f,1),fi:r(fi,1)};
}
function ensureSingleDieta(d){
  if(!d)d={giorni:{}};
  if(!d.giorni)d.giorni={};
  for(var i=0;i<7;i++){
    if(!d.giorni[i])d.giorni[i]={colazione:[],spuntino_m:[],pranzo:[],merenda:[],cena:[],note:{}};
    if(!d.giorni[i].note)d.giorni[i].note={};
  }
  return d;
}
function ensureDieta(pat){
  pat.dieta=ensureSingleDieta(pat.dieta);
  pat.dietaA=ensureSingleDieta(pat.dietaA);
  pat.dietaB=ensureSingleDieta(pat.dietaB);
  if(!pat.configAB)pat.configAB={enabled:false,startDate:'',durata:8};
  return pat;
}
function el(id){return document.getElementById(id);}
function setHtml(id,html){var e=el(id);if(e)e.innerHTML=html;}

// ── SESSION STATE ─────────────────────────────────────────────────────────────
var S={role:null,nutriId:null,patientId:null,selDay:0,weekOffset:0,activeDietKey:'A',curTab:'oggi',editCtx:{},selFood:null,manualOpen:false,editingPatientId:null};

// ── LOGIN ─────────────────────────────────────────────────────────────────────
var loginRole='nutrizionista';
function setLoginRole(role){
  loginRole=role;
  el('tabNutri').classList.toggle('active',role==='nutrizionista');
  el('tabPaz').classList.toggle('active',role==='paziente');
  el('loginNutriFields').style.display=role==='nutrizionista'?'block':'none';
  el('loginPazFields').style.display=role==='paziente'?'block':'none';
  el('btnLogin').className='btn-login '+(role==='nutrizionista'?'nutri':'paziente');
  el('loginHint').textContent=role==='nutrizionista'?'Prima volta? Registra un account nutrizionista.':'Inserisci il codice che ti ha dato il tuo nutrizionista.';
}
function showLoadingLogin(on){el('btnLogin').textContent=on?'Caricamento...':'Accedi';el('btnLogin').disabled=on;}
async function doLogin(){
  el('loginErr').textContent='';
  if(loginRole==='nutrizionista'){
    var user=el('nutriUser').value.trim().toLowerCase();
    var pass=el('nutriPass').value;
    if(!user||!pass){el('loginErr').textContent='Compila tutti i campi.';return;}
    showLoadingLogin(true);
    try{
      var accounts=await loadNutriAccounts();
      var acc=accounts.find(function(a){return a.user===user&&a.passHash===hashPass(pass);});
      if(!acc){el('loginErr').textContent='Credenziali non corrette.';showLoadingLogin(false);return;}
      saveSession({role:'nutrizionista',nutriId:acc.id,nutriNome:acc.nome,nutriUser:acc.user});
      await startApp('nutrizionista',acc);
    }catch(e){el('loginErr').textContent='Errore connessione. Controlla la rete.';showLoadingLogin(false);}
  }else{
    var code=el('pazCode').value.trim().toUpperCase();
    if(!code){el('loginErr').textContent='Inserisci il codice accesso.';return;}
    showLoadingLogin(true);
    try{
      var pat=await loadPatientByCode(code);
      if(!pat){el('loginErr').textContent='Codice non trovato. Controlla con il nutrizionista.';showLoadingLogin(false);return;}
      _patients=[pat];
      saveSession({role:'paziente',patientId:pat.id});
      await startApp('paziente',pat);
    }catch(e){el('loginErr').textContent='Errore connessione. Controlla la rete.';showLoadingLogin(false);}
  }
}
function doLogout(){
  clearSession();
  if(_unsubscribePatients){_unsubscribePatients();_unsubscribePatients=null;}
  _patients=[];
  S={role:null,nutriId:null,patientId:null,selDay:todayIdx(),curTab:'oggi',editCtx:{},selFood:null,manualOpen:false,editingPatientId:null};
  el('appShell').classList.remove('visible');
  el('bottomNav').style.display='none';
  el('loginScreen').style.display='flex';
  el('loginErr').textContent='';
}
function showRegister(){openModal('modalRegister');}
async function doRegister(){
  el('regErr').textContent='';
  var nome=el('regNome').value.trim();
  var user=el('regUser').value.trim().toLowerCase();
  var pass=el('regPass').value;
  var pass2=el('regPass2').value;
  if(!nome||!user||!pass){el('regErr').textContent='Compila tutti i campi.';return;}
  if(pass.length<6){el('regErr').textContent='Password minimo 6 caratteri.';return;}
  if(pass!==pass2){el('regErr').textContent='Le password non coincidono.';return;}
  try{
    var accounts=await loadNutriAccounts();
    if(accounts.find(function(a){return a.user===user;})){el('regErr').textContent='Username già in uso.';return;}
    var acc={id:uid(),nome:nome,user:user,passHash:hashPass(pass)};
    await fsSet('nutrizionisti',acc.id,acc);
    closeModal('modalRegister');
    showToast('✅ Account creato! Accedi ora.',3000);
    el('nutriUser').value=user;
    el('nutriPass').value='';
  }catch(e){el('regErr').textContent='Errore: '+e.message;}
}

// ── START APP ─────────────────────────────────────────────────────────────────
async function startApp(role,entity){
  S.role=role;S.selDay=todayIdx();S.weekOffset=0;S.activeDietKey='A';
  el('loginScreen').style.display='none';
  el('appShell').classList.add('visible');
  el('bottomNav').style.display='flex';
  showLoadingLogin(false);
  if(role==='nutrizionista'){
    S.nutriId=entity.id;S.patientId=null;
    el('hTitle').textContent='🩺 Studio '+entity.nome.split(' ').pop();
    el('hSub').textContent=entity.nome;
    el('hRoleBadge').textContent='Nutrizionista';
    el('hRoleBadge').className='role-badge nutri';
    el('hKcal').style.display='none';
    setupNutriTabs();
    // Carica logo da Firestore e aggiorna cache locale
    loadLogoFromFirestore().then(function(){});
    await startPatientsListener(entity.id,function(){
      if(S.curTab==='pazienti')renderPazienti();
      else if(S.curTab==='oggi')renderOggi();
      else if(S.curTab==='settimana')renderSettimana();
      else if(S.curTab==='nutrienti')renderNutrienti();
    });
    switchTab('pazienti',0);
  }else{
    S.patientId=entity.id;
    var pat=ensureDieta(entity);
    el('hTitle').textContent='🥗 '+pat.nome;
    el('hSub').textContent='Il mio piano alimentare';
    el('hRoleBadge').textContent='Paziente';
    el('hRoleBadge').className='role-badge paziente';
    setupPazienteTabs();
    await startPatientListener(entity.id,function(){
      if(S.curTab==='oggi')renderOggi();
      else if(S.curTab==='settimana')renderSettimana();
      else if(S.curTab==='nutrienti')renderNutrienti();
      renderHeader();
    });
    switchTab('oggi',0);renderHeader();
  }
}

// ── TABS ──────────────────────────────────────────────────────────────────────
function setupNutriTabs(){
  el('tabBar').innerHTML='<div class="tab active purple" onclick="switchTab(\'pazienti\',0);setNav(0)">👥 Pazienti</div>'
    +'<div class="tab" onclick="switchTab(\'impostazioni\',1);setNav(1)">⚙️ Account</div>';
  el('bottomNav').innerHTML='<div class="nav-item active purple-nav" id="nav0" onclick="switchTab(\'pazienti\',0);setNav(0)"><span class="nav-icon">👥</span><span class="nav-lbl">Pazienti</span></div>'
    +'<div class="nav-item" id="nav1" onclick="switchTab(\'impostazioni\',1);setNav(1)"><span class="nav-icon">⚙️</span><span class="nav-lbl">Account</span></div>';
}
function setupPazienteTabs(){
  el('tabBar').innerHTML='<div class="tab active" onclick="switchTab(\'oggi\',0);setNav(0)">📅 Oggi</div>'
    +'<div class="tab" onclick="switchTab(\'settimana\',1);setNav(1)">📆 Settimana</div>'
    +'<div class="tab" onclick="switchTab(\'nutrienti\',2);setNav(2)">📊 Nutrienti</div>'
    +'<div class="tab" onclick="switchTab(\'codice\',3);setNav(3)">🔑 Codice</div>';
  el('bottomNav').innerHTML='<div class="nav-item active" id="nav0" onclick="switchTab(\'oggi\',0);setNav(0)"><span class="nav-icon">📅</span><span class="nav-lbl">Oggi</span></div>'
    +'<div class="nav-item" id="nav1" onclick="switchTab(\'settimana\',1);setNav(1)"><span class="nav-icon">📆</span><span class="nav-lbl">Settimana</span></div>'
    +'<div class="nav-item" id="nav2" onclick="switchTab(\'nutrienti\',2);setNav(2)"><span class="nav-icon">📊</span><span class="nav-lbl">Nutrienti</span></div>'
    +'<div class="nav-item" id="nav3" onclick="switchTab(\'codice\',3);setNav(3)"><span class="nav-icon">🔑</span><span class="nav-lbl">Codice</span></div>';
}
function setupNutriEditTabs(pat){
  el('tabBar').innerHTML='<div class="tab active purple" onclick="switchTab(\'oggi\',0);setNav(0)">📅 Dieta</div>'
    +'<div class="tab" onclick="switchTab(\'settimana\',1);setNav(1)">📆 Sett.</div>'
    +'<div class="tab" onclick="switchTab(\'configAB\',2);setNav(2)">🔄 A/B</div>'
    +'<div class="tab" onclick="switchTab(\'monitoraggio\',3);setNav(3)">📏 Misure</div>'
    +'<div class="tab" onclick="backToPazienti()">← Pazienti</div>';
  el('bottomNav').innerHTML='<div class="nav-item active purple-nav" id="nav0" onclick="switchTab(\'oggi\',0);setNav(0)"><span class="nav-icon">📅</span><span class="nav-lbl">Dieta</span></div>'
    +'<div class="nav-item" id="nav1" onclick="switchTab(\'settimana\',1);setNav(1)"><span class="nav-icon">📆</span><span class="nav-lbl">Settimana</span></div>'
    +'<div class="nav-item" id="nav2" onclick="switchTab(\'configAB\',2);setNav(2)"><span class="nav-icon">🔄</span><span class="nav-lbl">A/B</span></div>'
    +'<div class="nav-item" id="nav3" onclick="switchTab(\'monitoraggio\',3);setNav(3)"><span class="nav-icon">📏</span><span class="nav-lbl">Misure</span></div>'
    +'<div class="nav-item" id="nav4" onclick="backToPazienti()"><span class="nav-icon">👥</span><span class="nav-lbl">Pazienti</span></div>';
  el('hTitle').textContent='✏️ '+pat.nome;
  el('hSub').textContent='Modifica piano alimentare';
}
function switchTab(tab,idx){
  var tabs=document.querySelectorAll('.tab');
  tabs.forEach(function(t,i){t.classList.toggle('active',i===idx);});
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});
  var sc=el('tab-'+tab);if(sc)sc.classList.add('active');
  S.curTab=tab;
  if(tab==='oggi')renderOggi();
  if(tab==='settimana')renderSettimana();
  if(tab==='nutrienti')renderNutrienti();
  if(tab==='codice')renderCodice();
  if(tab==='configAB')renderConfigAB();
  if(tab==='monitoraggio')renderMonitoraggio();
  if(tab==='pazienti')renderPazienti();
  if(tab==='impostazioni')renderImpostazioni();
}
function setNav(i){document.querySelectorAll('.nav-item').forEach(function(n,j){n.classList.toggle('active',j===i);});}

// ── HEADER ────────────────────────────────────────────────────────────────────
function renderHeader(){
  if(S.role!=='paziente')return;
  var pat=getPatientById(S.patientId);if(!pat)return;
  var tot=getTotals(pat,S.selDay);
  el('hKcal').textContent=tot.kcal+' kcal';el('hKcal').style.display='block';
}

// ── OGGI ──────────────────────────────────────────────────────────────────────
function getWeekLabel(offset){
  var d=new Date();
  var curDow=d.getDay()===0?6:d.getDay()-1;
  var mon=new Date(d);mon.setDate(d.getDate()-curDow+offset*7);
  var sun=new Date(mon);sun.setDate(mon.getDate()+6);
  return mon.getDate()+'/'+('0'+(mon.getMonth()+1)).slice(-2)+' – '+sun.getDate()+'/'+('0'+(sun.getMonth()+1)).slice(-2);
}
function getActiveDietLabel(pat){
  var cfg=pat&&pat.configAB||{};
  if(!cfg.enabled) return '';
  if(!isDietaABActive(pat, S.weekOffset)){
    return ' — Dieta base';
  }
  var start=cfg.startDate?new Date(cfg.startDate):new Date();
  var now=new Date();
  var baseW=Math.floor((now-start)/(7*24*60*60*1000));
  var targetW=baseW+S.weekOffset;
  var key=targetW%2===0?'A':'B';
  var rimanenti=cfg.durata>0?(cfg.durata-(baseW)):'∞';
  return ' — Dieta '+key+(cfg.durata>0?' (sett. '+(targetW+1)+'/'+cfg.durata+')':'');
}
function renderOggi(){
  if(S.role==='nutrizionista'){renderNutriOggi();return;}
  var wrap=el('tab-oggi');var t=todayIdx();
  var pat=getPatientById(S.patientId);
  var dietaLabel=getActiveDietLabel(pat);
  var html='<div class="week-nav">'
    +'<button class="week-nav-btn" onclick="changeWeek(-1)">‹</button>'
    +'<div class="week-nav-label">'+(S.weekOffset===0?'Settimana corrente':S.weekOffset>0?'+'+S.weekOffset+' sett.':S.weekOffset+' sett.')+dietaLabel+'</div>'
    +'<button class="week-nav-btn" onclick="changeWeek(1)">›</button>'
    +'</div>'
    +'<div class="day-sel">';
  GG.forEach(function(g,i){
    var d=getDateOfWeek(i,S.weekOffset);
    var isToday=(S.weekOffset===0&&i===t);
    html+='<div class="day-btn'+(i===S.selDay?' active':'')+(isToday?' today':'')+'" onclick="selectDay('+i+')">'
      +'<span class="day-name">'+g+'</span><span class="day-num">'+d.getDate()+'</span>'
      +(isToday?'<span class="day-dot"></span>':'')+'</div>';
  });
  html+='</div><div id="mealCards"></div>';
  wrap.innerHTML=html;
  renderMeals();
}
function changeWeek(delta){S.weekOffset+=delta;renderOggi();renderHeader();}
function selectDay(i){S.selDay=i;renderOggi();renderHeader();}
function setDietKey(key){S.activeDietKey=key;renderOggi();}
function setDietKey_A(){setDietKey('A');}
function setDietKey_B(){setDietKey('B');}

function getDateOfWeek(dayIdx,weekOffset){
  var d=new Date();
  var cur=d.getDay()===0?6:d.getDay()-1;
  d.setDate(d.getDate()-cur+dayIdx+weekOffset*7);
  return d;
}

function renderMeals(){
  var pat=getPatientById(S.patientId);if(!pat)return;
  ensureDieta(pat);
  var dieta=getDietaForWeek(pat,S.weekOffset);
  var g=(dieta.giorni||{})[S.selDay]||{};
  var note=g.note||{};
  var chk=getCheckins();
  var isNutri=S.role==='nutrizionista';
  var html='';
  PASTI.forEach(function(pm){
    var cibi=g[pm.id]||[];
    var kcal=r(cibi.reduce(function(s,f){return s+(f.kcal||0);},0));
    var pp=r(cibi.reduce(function(s,f){return s+(f.p||0);},0),1);
    var cc=r(cibi.reduce(function(s,f){return s+(f.c||0);},0),1);
    var fat=r(cibi.reduce(function(s,f){return s+(f.fat||f.f||0);},0),1);
    var fi=r(cibi.reduce(function(s,f){return s+(f.fi||0);},0),1);
    var ckKey=S.patientId+'_'+S.selDay+'_'+pm.id;
    var done=chk[ckKey];
    html+='<div class="meal-card">'
      +'<div class="meal-hdr">'
      +'<div class="meal-icon-wrap">'
      +'<div class="meal-icon" style="background:'+pm.bg+'">'+pm.emoji+'</div>'
      +'<div><div class="meal-name-txt">'+pm.nome+'</div><div class="meal-time">'+pm.ora+'</div></div>'
      +'</div>'
      +'<div style="display:flex;align-items:center;gap:8px">'
      +'<span class="kcal-badge chip chip-p" style="background:var(--blue-l);color:var(--blue-d);font-size:12px;padding:4px 9px;border-radius:20px">'+kcal+' kcal</span>'
      +(isNutri?'':'<div class="check-btn'+(done?' done':'')+'" onclick="toggleCheck(\''+ckKey+'\')" title="Segna come mangiato">✓</div>')
      +'</div></div>';
    if(cibi.length){
      html+='<div class="food-list">';
      cibi.forEach(function(food,fi2){
        html+='<div class="food-row">'
          +'<span class="food-name">'+food.n+'</span>'
          +'<span class="food-qty">'+(food.q||'—')+'</span>'
          +'<span class="food-kcal-sm">'+r(food.kcal||0)+' kcal</span>'
          +(isNutri?'<button class="food-del" onclick="deleteFood('+S.selDay+',\''+pm.id+'\','+fi2+')">✕</button>':'')
          +'</div>';
      });
      html+='</div><div class="macros-row">'
        +'<span class="chip chip-p">P '+pp+'g</span>'
        +'<span class="chip chip-c">C '+cc+'g</span>'
        +'<span class="chip chip-f">G '+fat+'g</span>'
        +(fi>0?'<span class="chip chip-fi">Fi '+fi+'g</span>':'')
        +'</div>';
    }else{
      html+='<div style="color:var(--text-sec);font-size:13px;margin-bottom:8px">'
        +(isNutri?'Nessun alimento — aggiungine uno':'Nessun alimento pianificato')+'</div>';
    }
    if(note[pm.id])html+='<div class="note-box"><div class="note-text">📝 '+note[pm.id]+'</div></div>';
    if(isNutri){
      html+='<div class="add-row">'
        +'<button class="btn-add" onclick="openAddFood('+S.selDay+',\''+pm.id+'\',\''+pm.nome+'\')">＋ Aggiungi alimento</button>'
        +'<button class="btn-note" onclick="openNote('+S.selDay+',\''+pm.id+'\',\''+pm.nome+'\')">📝</button>'
        +'</div>';
    }else{
      html+='<div class="readonly-badge">✅ Solo il tuo nutrizionista può modificare il piano</div>';
    }
    html+='</div>';
  });
  setHtml('mealCards',html);
}
function toggleCheck(key){var c=getCheckins();c[key]=!c[key];saveCheckins(c);renderMeals();}
function deleteFood(dayIdx,pId,fi){
  var pat=ensureDieta(getPatientById(S.patientId));
  var dietaKey=S.activeDietKey||'A';
  var tDieta=pat.configAB&&pat.configAB.enabled?(dietaKey==='B'?pat.dietaB:pat.dietaA):pat.dieta;
  tDieta.giorni[dayIdx][pId].splice(fi,1);
  updatePatient(pat);renderMeals();renderHeader();
}

// ── NUTRI OGGI ────────────────────────────────────────────────────────────────
function renderNutriOggi(){
  var wrap=el('tab-oggi');
  if(!S.patientId){
    wrap.innerHTML='<div class="empty-state"><div class="empty-state-icon">👥</div>'
      +'<div class="empty-state-title">Seleziona un paziente</div>'
      +'<div class="empty-state-sub">Vai nella tab Pazienti, seleziona un paziente e poi torna qui per modificare la sua dieta.</div></div>';
    return;
  }
  var pat=getPatientById(S.patientId);
  if(!pat){S.patientId=null;renderNutriOggi();return;}
  var t=todayIdx();
  var html='<div style="background:var(--purple-l);border:.5px solid var(--purple);border-radius:var(--rs);padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px">'
    +'<span style="font-size:20px">✏️</span>'
    +'<div><div style="font-size:13px;font-weight:700;color:var(--purple-d)">Stai modificando la dieta di</div>'
    +'<div style="font-size:15px;font-weight:800;color:var(--purple-d)">'+pat.nome+'</div></div>'
    +'<button onclick="S.patientId=null;renderNutriOggi()" style="margin-left:auto;background:none;border:none;color:var(--purple-d);font-size:18px;cursor:pointer">✕</button>'
    +'</div>';
  var dietaKeyLabel=pat&&pat.configAB&&pat.configAB.enabled?' — Dieta '+S.activeDietKey:'';
  html+='<div class="week-nav">'
    +'<button class="week-nav-btn" onclick="changeWeek(-1)">‹</button>'
    +'<div class="week-nav-label">'+(S.weekOffset===0?'Settimana corrente':S.weekOffset>0?'+'+S.weekOffset+' sett.':S.weekOffset+' sett.')+dietaKeyLabel+'</div>'
    +'<button class="week-nav-btn" onclick="changeWeek(1)">›</button>'
    +'</div>';
  if(pat&&pat.configAB&&pat.configAB.enabled){
    var btnA='<button class="dks-btn'+(S.activeDietKey==='A'?' active':'')+'" onclick="setDietKey_A()">Dieta A</button>';
    var btnB='<button class="dks-btn'+(S.activeDietKey==='B'?' active':'')+'" onclick="setDietKey_B()">Dieta B</button>';
    html+='<div class="diet-key-switch">'+btnA+btnB+'</div>';
  }
  html+='<div class="day-sel">';
  GG.forEach(function(g,i){
    var d=getDateOfWeek(i,S.weekOffset);
    var isToday=(S.weekOffset===0&&i===t);
    html+='<div class="day-btn'+(i===S.selDay?' active':'')+(isToday?' today':'')+'" onclick="selectDay('+i+')">'
      +'<span class="day-name">'+g+'</span><span class="day-num">'+d.getDate()+'</span>'
      +(isToday?'<span class="day-dot"></span>':'')+'</div>';
  });
  html+='</div><div id="mealCards"></div>';
  wrap.innerHTML=html;
  renderMeals();
}

// ── SETTIMANA ─────────────────────────────────────────────────────────────────
function renderSettimana(){
  var pat=getPatientById(S.patientId);
  if(!pat){
    setHtml('tab-settimana','<div class="empty-state"><div class="empty-state-icon">📆</div><div class="empty-state-title">Nessun paziente selezionato</div></div>');
    return;
  }
  var t=todayIdx();
  var html='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">'
    +'<div class="sec-title" style="margin:0">Piano settimanale — '+pat.nome+'</div>'
    +'<button onclick="printDieta(\''+pat.id+'\')" style="display:flex;align-items:center;gap:6px;padding:8px 14px;background:var(--blue);color:white;border:none;border-radius:var(--rs);font-size:13px;font-weight:700;cursor:pointer">🖨️ Stampa</button>'
    +'</div><div class="week-grid">';
  GG_E.forEach(function(g,i){
    var d=getDate(i);
    var tot=getTotals(pat,i,S.weekOffset);
    var obj=pat.obiettivi||{kcal:1800,p:120,c:200,f:60};
    var chk=getCheckins();
    var dots='';
    PASTI.forEach(function(p){dots+='<div class="wc-dot'+(chk[S.patientId+'_'+i+'_'+p.id]?' done':'')+'"></div>';});
    html+='<div class="week-card'+(i===t?' today-c':'')+'" onclick="goToDay('+i+')">'
      +'<div class="wc-day">'+g+'</div><div class="wc-date">'+d.getDate()+' '+MM[d.getMonth()]+'</div>'
      +'<div class="wc-kcal">'+tot.kcal+' <span class="wc-kcal-lbl">kcal</span></div>'
      +'<div class="wc-prog">'
      +'<div class="wc-seg" style="background:#378ADD;opacity:'+Math.min(1,tot.p/obj.p)+'"></div>'
      +'<div class="wc-seg" style="background:#EF9F27;opacity:'+Math.min(1,tot.c/obj.c)+'"></div>'
      +'<div class="wc-seg" style="background:#1D9E75;opacity:'+Math.min(1,tot.kcal/obj.kcal)+'"></div>'
      +'</div><div class="wc-dots">'+dots+'</div></div>';
  });
  html+='</div>';
  setHtml('tab-settimana',html);
}
function goToDay(i){S.selDay=i;switchTab('oggi',0);setNav(0);}

// ── NUTRIENTI ─────────────────────────────────────────────────────────────────
function renderNutrienti(){
  var pat=getPatientById(S.patientId);
  if(!pat){setHtml('tab-nutrienti','<div class="empty-state"><div class="empty-state-icon">📊</div><div class="empty-state-title">Nessun paziente selezionato</div></div>');return;}
  var tot=getTotals(pat,S.selDay);
  var obj=pat.obiettivi||{kcal:1800,p:120,c:200,f:60};
  var macros=[
    {lbl:'Calorie',val:tot.kcal,unit:'kcal',target:obj.kcal,color:'#378ADD'},
    {lbl:'Proteine',val:tot.p,unit:'g',target:obj.p,color:'#1D9E75'},
    {lbl:'Carboidrati',val:tot.c,unit:'g',target:obj.c,color:'#EF9F27'},
    {lbl:'Grassi',val:tot.f,unit:'g',target:obj.f,color:'#D85A30'}
  ];
  var g=((pat.dieta||{}).giorni||{})[S.selDay]||{};
  var maxK=1;
  PASTI.forEach(function(pm){var k=(g[pm.id]||[]).reduce(function(s,f){return s+(f.kcal||0);},0);if(k>maxK)maxK=k;});
  var now=new Date();
  var html='<div class="sec-title">Macronutrienti — '+GG_E[S.selDay]+'</div><div class="macro-grid">';
  macros.forEach(function(m){
    var pct=Math.min(100,r(m.val/m.target*100));
    html+='<div class="macro-stat">'
      +'<div class="macro-val">'+m.val+' <span class="macro-unit">'+m.unit+'</span></div>'
      +'<div class="macro-lbl">'+m.lbl+'</div>'
      +'<div class="macro-bar"><div class="macro-fill" style="width:'+pct+'%;background:'+m.color+'"></div></div>'
      +'<div class="macro-pct">'+pct+'% obiettivo</div></div>';
  });
  html+='</div><div class="breakdown-card"><div class="breakdown-title">Distribuzione calorica per pasto</div>';
  PASTI.forEach(function(pm){
    var k=r((g[pm.id]||[]).reduce(function(s,f){return s+(f.kcal||0);},0));
    html+='<div class="bdr">'
      +'<span class="bd-icon">'+pm.emoji+'</span><span class="bd-name">'+pm.nome+'</span>'
      +'<div class="bd-bar-w"><div class="bd-bar" style="width:'+r(k/maxK*100)+'%"></div></div>'
      +'<span class="bd-kcal">'+k+'</span></div>';
  });
  html+='</div><div class="tip-card"><div class="tip-title">💡 Consiglio del giorno</div>'
    +'<div class="tip-text">'+TIPS[now.getDay()%TIPS.length]+'</div></div>';
  setHtml('tab-nutrienti',html);
}

// ── CODICE PAZIENTE ───────────────────────────────────────────────────────────
function renderCodice(){
  var pat=getPatientById(S.patientId);if(!pat)return;
  var html='<div class="sec-title">Il tuo codice accesso</div>'
    +'<div class="card">'
    +'<div class="card-desc" style="margin-bottom:12px">Usa questo codice per accedere alla tua dieta su qualsiasi dispositivo.</div>'
    +'<div class="code-big">'+pat.codice+'</div>'
    +'<button class="btn-act btn-prim" onclick="copyMyCode()" style="margin-top:8px">📋 Copia codice</button>'
    +'</div>';
  setHtml('tab-codice',html);
}
function copyMyCode(){
  var pat=getPatientById(S.patientId);if(!pat)return;
  if(navigator.clipboard)navigator.clipboard.writeText(pat.codice).then(function(){showToast('📋 Codice copiato!');});
  else showToast('Codice: '+pat.codice,4000);
}

// ── PAZIENTI ──────────────────────────────────────────────────────────────────
function renderPazienti(){
  var patients=getPatientsOf(S.nutriId);
  var wrap=el('tab-pazienti');
  var totalFoods=patients.reduce(function(s,p){return s+Object.values((p.dieta&&p.dieta.giorni)||{}).reduce(function(ss,g){return ss+PASTI.reduce(function(sss,pm){return sss+(g[pm.id]||[]).length;},0);},0);},0);
  var html='<div class="nutri-stats">'
    +'<div class="nstat"><div class="nstat-val">'+patients.length+'</div><div class="nstat-lbl">Pazienti</div></div>'
    +'<div class="nstat"><div class="nstat-val">'+patients.filter(function(p){return p.dieta;}).length+'</div><div class="nstat-lbl">Con dieta</div></div>'
    +'<div class="nstat"><div class="nstat-val">'+totalFoods+'</div><div class="nstat-lbl">Alimenti tot.</div></div>'
    +'</div>'
    +'<button class="btn-full btn-prim purple" onclick="openModal(\'modalAddPatient\')" style="margin-bottom:12px">＋ Aggiungi nuovo paziente</button>';
  if(!patients.length){
    html+='<div class="empty-state"><div class="empty-state-icon">👤</div>'
      +'<div class="empty-state-title">Nessun paziente ancora</div>'
      +'<div class="empty-state-sub">Aggiungi il tuo primo paziente e crea la sua dieta personalizzata.</div></div>';
  }else{
    html+='<div class="sec-title">I tuoi pazienti</div><div class="patient-list">';
    patients.forEach(function(pat){
      var allTot=Object.keys((pat.dieta&&pat.dieta.giorni)||{}).reduce(function(s,k){return s+getTotals(pat,parseInt(k)).kcal;},0);
      var avgK=r(allTot/7);
      var foods=Object.values((pat.dieta&&pat.dieta.giorni)||{}).reduce(function(s,g){return s+PASTI.reduce(function(ss,pm){return ss+(g[pm.id]||[]).length;},0);},0);
      html+='<div class="patient-card">'
        +'<div class="patient-header">'
        +'<div class="patient-name">👤 '+pat.nome+'</div>'
        +'<span class="patient-code">'+pat.codice+'</span>'
        +'</div>'
        +'<div class="patient-meta">'+(pat.note||'Nessuna nota')+' · '+foods+' alimenti · ~'+avgK+' kcal/die</div>'
        +'<div class="patient-actions">'
        +'<button class="btn-sm btn-sm-blue" onclick="editPatientDiet(\''+pat.id+'\')">✏️ Modifica dieta</button>'
        +'<button class="btn-sm btn-sm-purple" onclick="showPatientCode(\''+pat.id+'\')">🔑 Codice accesso</button>'
        +'<button class="btn-sm btn-sm-amber" onclick="openEditPatient(\''+pat.id+'\')">⚙️ Dati</button>'
        +'<button class="btn-sm" style="background:#E6F1FB;color:#0C447C" onclick="openPrintModal(\''+pat.id+'\')">🖨️ Stampa</button>'
        +'<button class="btn-sm btn-sm-red" onclick="deletePatient(\''+pat.id+'\')">🗑️</button>'
        +'</div></div>';
    });
    html+='</div>';
  }
  wrap.innerHTML=html;
}
function editPatientDiet(patId){
  S.patientId=patId;
  var pat=getPatientById(patId);
  setupNutriEditTabs(pat);
  switchTab('oggi',0);setNav(0);
}
function backToPazienti(){
  S.patientId=null;setupNutriTabs();
  el('hTitle').textContent='🩺 Studio';el('hSub').textContent='';
  switchTab('pazienti',0);setNav(0);
}
function showPatientCode(patId){
  var pat=getPatientById(patId);if(!pat)return;
  el('modalCodeText').textContent=pat.codice;
  el('modalCodeName').textContent=pat.nome;
  if(navigator.share)el('btnShareCode').style.display='block';
  openModal('modalPatientCode');
}
function copyCode(){
  var code=el('modalCodeText').textContent;
  if(navigator.clipboard)navigator.clipboard.writeText(code).then(function(){showToast('📋 Codice copiato!');});
}
function shareCode(){
  var code=el('modalCodeText').textContent;
  var name=el('modalCodeName').textContent;
  if(navigator.share)navigator.share({title:'Codice dieta',text:'Ciao '+name+'! Il tuo codice per accedere alla tua dieta è: '+code});
}
async function savePatient(){
  var nome=el('pNome').value.trim();
  if(!nome){showToast('⚠️ Inserisci il nome del paziente');return;}
  var pat={id:uid(),nutriId:S.nutriId,nome:nome,
    note:el('pNote').value.trim(),
    codice:genCode(nome),
    obiettivi:{kcal:parseInt(el('pKcal').value)||1800,p:parseInt(el('pProt').value)||120,c:parseInt(el('pCarb').value)||200,f:parseInt(el('pFat').value)||60},
    dieta:{giorni:{}}};
  for(var i=0;i<7;i++)pat.dieta.giorni[i]={colazione:[],spuntino_m:[],pranzo:[],merenda:[],cena:[],note:{}};
  try{
    _patients.push(pat);
    await fsSet('pazienti',pat.id,pat);
    closeModal('modalAddPatient');
    ['pNome','pNote','pKcal','pProt','pCarb','pFat'].forEach(function(id){el(id).value='';});
    renderPazienti();
    showToast('✅ Paziente aggiunto! Codice: '+pat.codice,4000);
    setTimeout(function(){showPatientCode(pat.id);},500);
  }catch(e){showToast('⚠️ Errore: '+e.message,3000);}
}
function openEditPatient(patId){
  var pat=getPatientById(patId);if(!pat)return;
  S.editingPatientId=patId;
  el('epNome').value=pat.nome;el('epNote').value=pat.note||'';
  el('epKcal').value=(pat.obiettivi&&pat.obiettivi.kcal)||1800;
  el('epProt').value=(pat.obiettivi&&pat.obiettivi.p)||120;
  el('epCarb').value=(pat.obiettivi&&pat.obiettivi.c)||200;
  el('epFat').value=(pat.obiettivi&&pat.obiettivi.f)||60;
  openModal('modalEditPatient');
}
async function saveEditPatient(){
  var pat=getPatientById(S.editingPatientId);if(!pat)return;
  pat.nome=el('epNome').value.trim()||pat.nome;
  pat.note=el('epNote').value.trim();
  pat.obiettivi={kcal:parseInt(el('epKcal').value)||1800,p:parseInt(el('epProt').value)||120,c:parseInt(el('epCarb').value)||200,f:parseInt(el('epFat').value)||60};
  await updatePatient(pat);closeModal('modalEditPatient');renderPazienti();showToast('✅ Dati aggiornati!');
}
async function deletePatient(patId){
  var pat=getPatientById(patId);if(!pat)return;
  if(!confirm('Eliminare '+pat.nome+'? Questa azione è irreversibile.'))return;
  try{
    _patients=_patients.filter(function(p){return p.id!==patId;});
    await fsDelete('pazienti',patId);
    if(S.patientId===patId)S.patientId=null;
    renderPazienti();showToast('🗑️ Paziente eliminato');
  }catch(e){showToast('⚠️ Errore: '+e.message,3000);}
}

// ── IMPOSTAZIONI ──────────────────────────────────────────────────────────────
function getPrintColors(){
  try{return JSON.parse(localStorage.getItem('print_colors_'+S.nutriId)||'null')||{primary:'#1a1a1a',accent:'#374151'};}
  catch(e){return{primary:'#1a1a1a',accent:'#374151'};}
}
function setPrintColor(key,val){
  var c=getPrintColors();c[key]=val;
  localStorage.setItem('print_colors_'+S.nutriId,JSON.stringify(c));
  renderImpostazioni();
}
function resetPrintColors(){
  localStorage.removeItem('print_colors_'+S.nutriId);
  renderImpostazioni();
  showToast('↩ Colori ripristinati');
}

function renderImpostazioni(){
  var logo=localStorage.getItem('nutri_logo_'+S.nutriId)||'';
  var pc=getPrintColors();
  var PP=['#1a1a1a','#1B4F8A','#1D7A5F','#8B2252','#7C3AED','#B45309','#0E7490','#374151'];
  var PA=['#6B7280','#3B82F6','#10B981','#EC4899','#8B5CF6','#F59E0B','#06B6D4','#EF4444'];
  var swP=PP.map(function(c){return '<div class="color-swatch'+(pc.primary===c?' selected':'')+'" style="background:'+c+'" onclick="setPrintColor(\'primary\',\''+c+'\')"></div>';}).join('')
    +'<div class="color-swatch cs-custom" onclick="el(\'cpPrimary\').click()">+</div>';
  var swA=PA.map(function(c){return '<div class="color-swatch'+(pc.accent===c?' selected':'')+'" style="background:'+c+'" onclick="setPrintColor(\'accent\',\''+c+'\')"></div>';}).join('')
    +'<div class="color-swatch cs-custom" onclick="el(\'cpAccent\').click()">+</div>';

  var html=''
    +'<div class="sec-title">Il mio account</div>'
    +'<div class="card"><div class="card-title">🩺 Nutrizionista</div>'
    +'<div style="font-size:13px;color:var(--text-sec);margin-top:4px">Pazienti seguiti: <strong>'+getPatientsOf(S.nutriId).length+'</strong></div></div>'

    +'<div class="sec-title">Logo studio</div>'
    +'<div class="card"><div class="card-desc">Il logo appare in alto su ogni stampa. PNG/JPG, max 1.2MB.</div>'
    +(logo
      ?'<div style="border:1px solid var(--border);border-radius:var(--rs);padding:10px;text-align:center;margin-bottom:10px;background:var(--bg-sec)">'
        +'<img src="'+logo+'" style="max-height:56px;max-width:200px;object-fit:contain" alt="Logo"></div>'
        +'<div style="display:flex;gap:8px"><button class="btn-act btn-exp" style="flex:1" onclick="triggerLogoUpload()">🔄 Cambia logo</button>'
        +'<button class="btn-act btn-rst" style="flex:0;padding:12px 16px" onclick="removeLogo()">🗑️</button></div>'
      :'<div style="border:2px dashed var(--border);border-radius:var(--rs);padding:20px;text-align:center;margin-bottom:10px;cursor:pointer" onclick="triggerLogoUpload()">'
        +'<div style="font-size:28px;margin-bottom:6px">🖼️</div>'
        +'<div style="font-size:13px;font-weight:700">Carica logo studio</div>'
        +'<div style="font-size:12px;color:var(--text-sec);margin-top:2px">Tocca per scegliere</div></div>'
        +'<button class="btn-act btn-imp" onclick="triggerLogoUpload()">📁 Scegli immagine</button>'
    )
    +'<input type="file" id="logoFileInput" accept="image/*" style="display:none" onchange="uploadLogo(event)"></div>'

    +'<div class="sec-title">Colori stampa</div>'
    +'<div class="card"><div class="card-desc">Scegli i colori per intestazioni e accenti nelle stampe dei piani alimentari.</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">'
    +'<div><label class="lbl">Colore principale</label><div class="color-palette">'+swP+'</div>'
    +'<input type="color" id="cpPrimary" style="display:none" value="'+pc.primary+'" oninput="setPrintColor(\'primary\',this.value)"></div>'
    +'<div><label class="lbl">Colore accento</label><div class="color-palette">'+swA+'</div>'
    +'<input type="color" id="cpAccent" style="display:none" value="'+pc.accent+'" oninput="setPrintColor(\'accent\',this.value)"></div>'
    +'</div>'
    +'<label class="lbl">Anteprima stampa</label>'
    +'<div style="border-radius:6px;overflow:hidden;margin-bottom:12px;border:1px solid var(--border)">'
    +'<div style="background:'+pc.primary+';color:white;padding:7px 12px;font-size:12px;font-weight:700">Lunedì &nbsp;·&nbsp; 1.850 kcal | P 145g  C 185g  G 52g</div>'
    +'<div style="padding:6px 12px;display:flex;justify-content:space-between;font-size:11px;background:#f9fafb">'
    +'<span style="font-weight:700;color:#1a1a1a">Colazione &nbsp;07:30</span>'
    +'<span style="color:'+pc.accent+';font-weight:700">455 kcal</span></div>'
    +'<div style="padding:4px 12px 7px;font-size:10.5px;color:#555;background:#f9fafb;border-top:1px solid #f0f0f0">'
    +'Fiocchi di avena 60g &nbsp;·&nbsp; Fage Total 0% 150g &nbsp;·&nbsp; Mirtilli 80g</div>'
    +'</div>'
    +'<button class="btn-act" style="background:var(--bg-sec);color:var(--text-sec);border:.5px solid var(--border)" onclick="resetPrintColors()">↩ Ripristina predefiniti</button></div>'

    +'<div class="sec-title">Dati</div>'
    +'<div class="card"><div class="card-title">⚠️ Cancella tutti i dati</div>'
    +'<div class="card-desc">Cancella permanentemente tutti i pazienti e le diete associate al tuo account.</div>'
    +'<button class="btn-act btn-rst" onclick="deleteAllData()">🗑️ Cancella tutti i dati</button></div>';

  setHtml('tab-impostazioni',html);
  // Refresh logo from Firestore in background
  if(S.nutriId){
    loadLogoFromFirestore().then(function(freshLogo){
      var cached=localStorage.getItem('nutri_logo_'+S.nutriId)||'';
      if(freshLogo&&freshLogo!==cached){renderImpostazioni();}
    });
  }
}
function triggerLogoUpload(){ el('logoFileInput').click(); }

async function uploadLogo(event){
  var file = event.target.files[0];
  if(!file) return;
  event.target.value = '';
  // Max 1.2MB file → base64 diventa ~1.6MB, sotto il limite Firestore di 1MB per campo
  // Se troppo grande, ridimensioniamo via canvas
  if(file.size > 1.2*1024*1024){
    showToast('⚠️ Immagine troppo grande. Max 1.2MB (PNG/JPG).');
    return;
  }
  showToast('⏳ Caricamento logo...', 5000);
  var reader = new FileReader();
  reader.onload = async function(e){
    var dataUrl = e.target.result;
    // Ridimensiona se necessario via canvas per rispettare limite Firestore
    dataUrl = await resizeLogoIfNeeded(dataUrl, 600, 200);
    try {
      // Salva su Firestore nella collection 'loghi'
      await db.collection('loghi').doc(S.nutriId).set({ logo: dataUrl, updatedAt: new Date().toISOString() });
      // Cache locale per caricamento immediato
      localStorage.setItem('nutri_logo_'+S.nutriId, dataUrl);
      showToast('✅ Logo salvato!');
      renderImpostazioni();
    } catch(err){
      // Se Firestore fallisce (es. doc troppo grande), salva solo in locale
      console.error('Logo save error:', err);
      localStorage.setItem('nutri_logo_'+S.nutriId, dataUrl);
      showToast('✅ Logo salvato localmente.');
      renderImpostazioni();
    }
  };
  reader.readAsDataURL(file);
}

function resizeLogoIfNeeded(dataUrl, maxW, maxH){
  return new Promise(function(resolve){
    var img = new Image();
    img.onload = function(){
      if(img.width <= maxW && img.height <= maxH){
        resolve(dataUrl); return;
      }
      var ratio = Math.min(maxW/img.width, maxH/img.height);
      var canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width*ratio);
      canvas.height = Math.round(img.height*ratio);
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/png', 0.9));
    };
    img.onerror = function(){ resolve(dataUrl); };
    img.src = dataUrl;
  });
}

async function removeLogo(){
  if(!confirm('Rimuovere il logo?')) return;
  try {
    await db.collection('loghi').doc(S.nutriId).delete();
  } catch(e){ console.warn('Logo delete from Firestore:', e); }
  localStorage.removeItem('nutri_logo_'+S.nutriId);
  showToast('🗑️ Logo rimosso');
  renderImpostazioni();
}

// Restituisce il logo: prima dalla cache locale, poi da Firestore
function getNutriLogo(){
  return localStorage.getItem('nutri_logo_'+S.nutriId)||'';
}

// Carica il logo da Firestore e aggiorna cache locale
async function loadLogoFromFirestore(){
  try {
    var snap = await db.collection('loghi').doc(S.nutriId).get();
    if(snap.exists){
      var logo = snap.data().logo||'';
      if(logo) localStorage.setItem('nutri_logo_'+S.nutriId, logo);
      return logo;
    }
  } catch(e){ console.warn('Logo load error:', e); }
  return localStorage.getItem('nutri_logo_'+S.nutriId)||'';
}
async function deleteAllData(){
  if(!confirm('Cancellare TUTTI i pazienti e le diete? Azione irreversibile!'))return;
  var toDelete=_patients.filter(function(p){return p.nutriId===S.nutriId;});
  _patients=_patients.filter(function(p){return p.nutriId!==S.nutriId;});
  try{await Promise.all(toDelete.map(function(p){return fsDelete('pazienti',p.id);}));renderPazienti();showToast('🗑️ Tutti i dati cancellati');}
  catch(e){showToast('⚠️ Errore: '+e.message,3000);}
}

// ── ADD FOOD ──────────────────────────────────────────────────────────────────
function openAddFood(dayIdx,pId,pNome){
  S.editCtx={dayIdx:dayIdx,pId:pId};S.selFood=null;S.manualOpen=false;
  el('modalFoodTitle').textContent='➕ Aggiungi a '+pNome;
  el('searchInp').value='';el('searchClear').style.display='none';
  closeSugg();
  el('selFoodBox').classList.remove('vis');
  el('qtySection').style.display='none';
  el('manualSec').classList.remove('open');
  el('manualToggle').textContent='✏️ Inserimento manuale (alimento non trovato)';
  ['inName','inQtyFree','inKcal','inProt','inCarb','inFat'].forEach(function(id){el(id).value='';});
  openModal('modalFood');
  setTimeout(function(){el('searchInp').focus();},350);
}
async function saveFood(){
  var food=null;
  if(S.selFood&&!S.manualOpen){
    var grams=parseFloat(el('inQtyG').value)||100;
    var ratio=grams/100;var f=S.selFood;
    food={n:f.name,q:grams+'g',kcal:r(f.kcal*ratio),p:r(f.p*ratio,1),c:r(f.c*ratio,1),fat:r(f.fat*ratio,1),fi:r((f.fiber||0)*ratio,1)};
  }else{
    var n=el('inName').value.trim();
    if(!n){showToast('⚠️ Inserisci il nome');return;}
    food={n:n,q:el('inQtyFree').value.trim()||'—',kcal:parseFloat(el('inKcal').value)||0,p:parseFloat(el('inProt').value)||0,c:parseFloat(el('inCarb').value)||0,fat:parseFloat(el('inFat').value)||0,fi:0};
  }
  var pat=ensureDieta(getPatientById(S.patientId));
  if(S.editCtx.isAB){
    // Salva nella dieta A o B
    var tDieta=AB.editKey==='A'?pat.dietaA:pat.dietaB;
    tDieta.giorni[S.editCtx.dayIdx][S.editCtx.pId].push(food);
    await updatePatient(pat);closeModal('modalFood');renderConfigAB();
  } else {
    var dietaKey=S.activeDietKey||'A';
    var targetDieta=pat.configAB&&pat.configAB.enabled?(dietaKey==='B'?pat.dietaB:pat.dietaA):pat.dieta;
    targetDieta.giorni[S.editCtx.dayIdx][S.editCtx.pId].push(food);
    await updatePatient(pat);closeModal('modalFood');renderMeals();renderHeader();
  }
  showToast('✅ '+food.n+' aggiunto!');
}
function openNote(dayIdx,pId,pNome){
  S.editCtx={dayIdx:dayIdx,pId:pId};
  el('modalNoteTitle').textContent='📝 Nota per '+pNome;
  var pat=getPatientById(S.patientId);
  el('inNote').value=(((pat&&pat.dieta&&pat.dieta.giorni)||{})[dayIdx]&&((pat.dieta.giorni[dayIdx].note)||{})[pId])||'';
  openModal('modalNote');
}
async function saveNote(){
  var pat=ensureDieta(getPatientById(S.patientId));
  var txt=el('inNote').value.trim();
  if(S.editCtx.isAB){
    var tDieta=AB.editKey==='A'?pat.dietaA:pat.dietaB;
    if(txt)tDieta.giorni[S.editCtx.dayIdx].note[S.editCtx.pId]=txt;
    else delete tDieta.giorni[S.editCtx.dayIdx].note[S.editCtx.pId];
    await updatePatient(pat);closeModal('modalNote');renderConfigAB();
  } else {
    var dietaKey=S.activeDietKey||'A';
    var tDieta2=pat.configAB&&pat.configAB.enabled?(dietaKey==='B'?pat.dietaB:pat.dietaA):pat.dieta;
    if(txt)tDieta2.giorni[S.editCtx.dayIdx].note[S.editCtx.pId]=txt;
    else delete tDieta2.giorni[S.editCtx.dayIdx].note[S.editCtx.pId];
    await updatePatient(pat);closeModal('modalNote');renderMeals();
  }
  showToast('📝 Nota salvata!');
}

// ── SEARCH ────────────────────────────────────────────────────────────────────
var suggIdx=-1;
function norm(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function onSearch(val){
  el('searchClear').style.display=val?'block':'none';
  if(val.length<2){closeSugg();return;}
  // Split into words - ALL words must appear somewhere in name or category
  var words=norm(val).split(/\s+/).filter(function(w){return w.length>0;});
  var results=FOOD_INDEX.filter(function(f){
    var haystack=f.search+(f.cat?' '+norm(f.cat):'');
    return words.every(function(w){return haystack.includes(w);});
  }).slice(0,15);
  renderSugg(results,val);
}
function positionSugg(){
  var box=el('suggestions');
  var inp=el('searchInp');
  if(!inp||!box)return;
  var rect=inp.getBoundingClientRect();
  var viewH=window.innerHeight;
  var spaceBelow=viewH-rect.bottom-8;
  var spaceAbove=rect.top-8;
  var estH=Math.min(280,results_count*72||260);
  if(spaceBelow>=120||spaceBelow>=spaceAbove){
    box.style.top=(rect.bottom+4)+'px';
    box.style.maxHeight=Math.max(120,spaceBelow)+'px';
  }else{
    box.style.top=Math.max(4,rect.top-Math.min(estH,spaceAbove)-4)+'px';
    box.style.maxHeight=Math.max(120,spaceAbove)+'px';
  }
  box.style.left=rect.left+'px';
  box.style.width=rect.width+'px';
}
var results_count=0;
function renderSugg(results,query){
  var box=el('suggestions');
  results_count=results.length;
  if(!results.length){
    box.innerHTML='<div class="sugg-empty">Nessun risultato per "'+query+'" — usa l\'inserimento manuale</div>';
    box.classList.add('open');
    positionSugg();
    return;
  }
  var safeQ=query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  var html='';
  results.forEach(function(f,i){
    var hi=f.name.replace(new RegExp('('+safeQ+')','gi'),'<b>$1</b>');
    html+='<div class="sugg-item" onclick="selectFood('+FOOD_INDEX.indexOf(f)+')" id="si'+i+'">'
      +'<div class="sugg-name">'+hi+'</div>'
      +'<div class="sugg-cat">'+(f.cat||'')+'</div>'
      +'<div class="sugg-macros">'
      +'<span class="sugg-chip chip-p">P '+f.p+'g</span>'
      +'<span class="sugg-chip chip-c">C '+f.c+'g</span>'
      +'<span class="sugg-chip chip-f">G '+f.fat+'g</span>'
      +'<span class="sugg-chip" style="background:var(--green-l);color:var(--green-d)">'+f.kcal+' kcal</span>'
      +'</div></div>';
  });
  box.innerHTML=html;
  box.classList.add('open');
  suggIdx=-1;
  positionSugg();
}
function closeSugg(){var b=el('suggestions');if(b){b.classList.remove('open');b.style.maxHeight='';}suggIdx=-1;}
// scroll listener rimosso — causava chiusura durante scroll dei suggerimenti
window.addEventListener('resize',function(){if(el('suggestions').classList.contains('open'))positionSugg();});
function onSearchKey(e){
  var items=document.querySelectorAll('.sugg-item');
  if(e.key==='ArrowDown'){e.preventDefault();suggIdx=Math.min(suggIdx+1,items.length-1);items.forEach(function(el,i){el.classList.toggle('active',i===suggIdx);});if(items[suggIdx])items[suggIdx].scrollIntoView({block:'nearest'});}
  else if(e.key==='ArrowUp'){e.preventDefault();suggIdx=Math.max(suggIdx-1,0);items.forEach(function(el,i){el.classList.toggle('active',i===suggIdx);});}
  else if(e.key==='Enter'&&suggIdx>=0){e.preventDefault();items[suggIdx].click();}
  else if(e.key==='Escape'){closeSugg();}
}
function selectFood(idx){
  var f=FOOD_INDEX[idx];S.selFood=f;
  el('searchInp').value=f.name;closeSugg();
  el('searchClear').style.display='block';
  el('selFoodName').textContent='✅ '+f.name;
  el('selFoodMacros').textContent='Per 100g: '+f.kcal+' kcal | P '+f.p+'g | C '+f.c+'g | G '+f.fat+'g'+(f.fiber?' | Fi '+f.fiber+'g':'');
  el('selFoodBox').classList.add('vis');
  el('qtySection').style.display='block';
  var presets=['30g','50g','100g','120g','150g','200g','250g'];
  el('qtyPresets').innerHTML=presets.map(function(p){return '<div class="qty-preset" onclick="setQtyPreset(\''+p+'\')">'+p+'</div>';}).join('');
  el('inQtyG').value='100';
  if(S.manualOpen)toggleManual();
}
function setQtyPreset(p){
  document.querySelectorAll('.qty-preset').forEach(function(e){e.classList.toggle('active',e.textContent===p);});
  el('inQtyG').value=parseInt(p);
}
function onQtyChange(){document.querySelectorAll('.qty-preset').forEach(function(e){e.classList.remove('active');});}
function clearSearch(){
  el('searchInp').value='';el('searchClear').style.display='none';
  closeSugg();S.selFood=null;
  el('selFoodBox').classList.remove('vis');el('qtySection').style.display='none';
  el('searchInp').focus();
}
function toggleManual(){
  S.manualOpen=!S.manualOpen;
  el('manualSec').classList.toggle('open',S.manualOpen);
  el('manualToggle').textContent=S.manualOpen?'▲ Chiudi inserimento manuale':'✏️ Inserimento manuale (alimento non trovato)';
}

// ── CONFIG DIETA A/B ─────────────────────────────────────────────────────────
// Stato editor A/B
var AB = { editKey: 'A', editDay: 0 };

function renderConfigAB(){
  var pat=getPatientById(S.patientId);
  if(!pat){setHtml('tab-configAB','<div class="empty-state"><div class="empty-state-title">Nessun paziente selezionato</div></div>');return;}
  ensureDieta(pat);
  var cfg=pat.configAB||{enabled:false,startDate:'',durata:8};
  var html='';

  // ── SEZIONE CONFIGURAZIONE ──
  html+='<div class="card" style="margin-bottom:10px">'
    +'<div class="card-title" style="margin-bottom:8px">⚙️ Impostazioni alternanza</div>'
    +'<label style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:10px">'
    +'<input type="checkbox" id="abEnabled" '+(cfg.enabled?'checked':'')+' onchange="toggleAB()" style="width:20px;height:20px;accent-color:var(--purple)">'
    +'<div><div style="font-size:14px;font-weight:700;color:var(--text)">Attiva Dieta A/B</div>'
    +'<div style="font-size:12px;color:var(--text-sec)">Settimane alternate: Sett.1→Dieta A, Sett.2→Dieta B...</div></div>'
    +'</label>'
    +'<div id="abOptions" style="'+(cfg.enabled?'':'display:none')+'">'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">'
    +'<div><label class="lbl">Data inizio</label>'
    +'<input type="date" class="inp" id="abStartDate" value="'+(cfg.startDate||new Date().toISOString().split('T')[0])+'" style="margin-bottom:0"></div>'
    +'<div><label class="lbl">Durata</label>'
    +'<select class="inp" id="abDurata" style="margin-bottom:0">'
    +'<option value="4"'+(cfg.durata==4?' selected':'')+'>4 sett.</option>'
    +'<option value="8"'+(cfg.durata==8?' selected':'')+'>8 sett.</option>'
    +'<option value="12"'+(cfg.durata==12?' selected':'')+'>12 sett.</option>'
    +'<option value="16"'+(cfg.durata==16?' selected':'')+'>16 sett.</option>'
    +'<option value="0"'+(cfg.durata==0?' selected':'')+'>Illimitata</option>'
    +'</select></div></div>'
    +'<button class="btn-full btn-prim purple" onclick="saveConfigAB()" style="margin-top:4px">💾 Salva impostazioni</button>'
    +'</div>'
    +'</div>';

  // ── SEZIONE EDITOR DIETE ──
  html+='<div class="sec-title">Crea e modifica i piani</div>';

  // Switch A / B
    // Pulsanti selezione Dieta A / B
  var btnStyleA='flex:1;padding:14px;border-radius:var(--r);border:'+(AB.editKey==='A'?'2px solid var(--blue)':'1px solid var(--border)')+';background:'+(AB.editKey==='A'?'var(--blue-l)':'var(--bg-sec)')+';cursor:pointer';
  var btnStyleB='flex:1;padding:14px;border-radius:var(--r);border:'+(AB.editKey==='B'?'2px solid var(--amber)':'1px solid var(--border)')+';background:'+(AB.editKey==='B'?'var(--amber-l)':'var(--bg-sec)')+';cursor:pointer';
  html+='<div style="display:flex;gap:6px;margin-bottom:10px">'
    +'<button onclick="setABKey_A()" style="'+btnStyleA+'">'
    +'<div style="font-size:22px">📋</div>'
    +'<div style="font-size:15px;font-weight:800;color:'+(AB.editKey==='A'?'var(--blue-d)':'var(--text-sec)')+'">Dieta A</div>'
    +'<div style="font-size:11px;color:var(--text-sec)">Settimane dispari</div>'
    +'</button>'
    +'<button onclick="setABKey_B()" style="'+btnStyleB+'">'
    +'<div style="font-size:22px">📋</div>'
    +'<div style="font-size:15px;font-weight:800;color:'+(AB.editKey==='B'?'var(--amber-d)':'var(--text-sec)')+'">Dieta B</div>'
    +'<div style="font-size:11px;color:var(--text-sec)">Settimane pari</div>'
    +'</button>'
    +'</div>';
  // Banner piano attivo
  var planColor = AB.editKey==='A' ? 'var(--blue)' : 'var(--amber)';
  var planBg = AB.editKey==='A' ? 'var(--blue-l)' : 'var(--amber-l)';
  html+='<div style="background:'+planBg+';border-radius:var(--rs);padding:10px 14px;margin-bottom:10px;font-size:13px;font-weight:700;color:'+planColor+'">'
    +'✏️ Stai modificando: Dieta '+AB.editKey+' — clicca un giorno e aggiungi gli alimenti'
    +'</div>';

  // Selettore giorni generici (senza date)
  html+='<div class="day-sel" style="margin-bottom:10px">';
  GG_E.forEach(function(g,i){
    html+='<div class="day-btn'+(i===AB.editDay?' active':'')+'" onclick="setABDay('+i+')" style="flex-shrink:0">'
      +'<span class="day-name">'+GG[i]+'</span>'
      +'<span class="day-num" style="font-size:12px;margin-top:2px">'+g.slice(0,3)+'</span>'
      +'</div>';
  });
  html+='</div>';

  // Pasti del giorno selezionato
  var dieta = AB.editKey==='A' ? pat.dietaA : pat.dietaB;
  var g = (dieta&&dieta.giorni&&dieta.giorni[AB.editDay])||{};
  var note = g.note||{};

  PASTI.forEach(function(pm){
    var cibi=g[pm.id]||[];
    var kcal=r(cibi.reduce(function(s,f){return s+(f.kcal||0);},0));
    html+='<div class="meal-card" style="margin-bottom:8px">'
      +'<div class="meal-hdr">'
      +'<div class="meal-icon-wrap">'
      +'<div class="meal-icon" style="background:'+pm.bg+'">'+pm.emoji+'</div>'
      +'<div><div class="meal-name-txt">'+pm.nome+'</div><div class="meal-time">'+pm.ora+'</div></div>'
      +'</div>'
      +'<span class="kcal-badge chip chip-p" style="background:var(--blue-l);color:var(--blue-d);font-size:12px;padding:4px 9px;border-radius:20px">'+kcal+' kcal</span>'
      +'</div>';
    if(cibi.length){
      html+='<div class="food-list">';
      cibi.forEach(function(food,fi){
        html+='<div class="food-row">'
          +'<span class="food-name">'+food.n+'</span>'
          +'<span class="food-qty">'+(food.q||'—')+'</span>'
          +'<span class="food-kcal-sm">'+r(food.kcal||0)+' kcal</span>'
          +'<button class="food-del" onclick="delABFood(\''+pm.id+'\','+fi+')">✕</button>'
          +'</div>';
      });
      html+='</div>';
      var pp=r(cibi.reduce(function(s,f){return s+(f.p||0);},0),1);
      var cc=r(cibi.reduce(function(s,f){return s+(f.c||0);},0),1);
      var ff=r(cibi.reduce(function(s,f){return s+(f.fat||f.f||0);},0),1);
      html+='<div class="macros-row"><span class="chip chip-p">P '+pp+'g</span><span class="chip chip-c">C '+cc+'g</span><span class="chip chip-f">G '+ff+'g</span></div>';
    } else {
      html+='<div style="color:var(--text-sec);font-size:13px;margin-bottom:8px">Nessun alimento — aggiungine uno</div>';
    }
    if(note[pm.id]) html+='<div class="note-box"><div class="note-text">📝 '+note[pm.id]+'</div></div>';
    html+='<div class="add-row">'
      +'<button class="btn-add" onclick="openABAddFood(\''+pm.id+'\',\''+pm.nome+'\')">'+'＋ Aggiungi alimento</button>'
      +'<button class="btn-note" onclick="openABNote(\''+pm.id+'\',\''+pm.nome+'\')">'+'📝</button>'
      +'</div>'
      +'</div>';
  });

  // Riepilogo giornaliero
  var totDay = {kcal:0,p:0,c:0,f:0};
  PASTI.forEach(function(pm){
    (g[pm.id]||[]).forEach(function(food){
      totDay.kcal+=food.kcal||0;totDay.p+=food.p||0;
      totDay.c+=food.c||0;totDay.f+=food.fat||food.f||0;
    });
  });
  if(totDay.kcal>0){
    html+='<div class="tip-card" style="margin-top:4px">'
      +'<div style="font-size:13px;font-weight:700;color:var(--blue-d)">📊 '+GG_E[AB.editDay]+' — Totale Dieta '+AB.editKey+'</div>'
      +'<div style="font-size:13px;color:var(--blue);margin-top:4px">'
      +r(totDay.kcal)+' kcal &nbsp;|&nbsp; P '+r(totDay.p,1)+'g &nbsp;|&nbsp; C '+r(totDay.c,1)+'g &nbsp;|&nbsp; G '+r(totDay.f,1)+'g'
      +'</div></div>';
  }

  html+='<div style="height:20px"></div>';
  setHtml('tab-configAB',html);
}

function setABKey(key){AB.editKey=key;renderConfigAB();}
function setABKey_A(){setABKey('A');}
function setABKey_B(){setABKey('B');}
function setABDay(i){AB.editDay=i;renderConfigAB();}

function openABAddFood(pId,pNome){
  S.editCtx={dayIdx:AB.editDay,pId:pId,isAB:true};
  el('modalFoodTitle').textContent='➕ Dieta '+AB.editKey+' — '+GG_E[AB.editDay]+' — '+pNome;
  el('searchInp').value='';el('searchClear').style.display='none';
  closeSugg();
  el('selFoodBox').classList.remove('vis');
  el('qtySection').style.display='none';
  el('manualSec').classList.remove('open');
  el('manualToggle').textContent='✏️ Inserimento manuale (alimento non trovato)';
  ['inName','inQtyFree','inKcal','inProt','inCarb','inFat'].forEach(function(id){el(id).value='';});
  S.selFood=null;S.manualOpen=false;
  openModal('modalFood');
  setTimeout(function(){el('searchInp').focus();},350);
}

function openABNote(pId,pNome){
  S.editCtx={dayIdx:AB.editDay,pId:pId,isAB:true};
  el('modalNoteTitle').textContent='📝 Dieta '+AB.editKey+' — '+GG_E[AB.editDay]+' — '+pNome;
  var pat=getPatientById(S.patientId);
  ensureDieta(pat);
  var dieta=AB.editKey==='A'?pat.dietaA:pat.dietaB;
  el('inNote').value=(((dieta.giorni||{})[AB.editDay]||{}).note||{})[pId]||'';
  openModal('modalNote');
}

function delABFood(pId,fi){
  var pat=ensureDieta(getPatientById(S.patientId));
  var dieta=AB.editKey==='A'?pat.dietaA:pat.dietaB;
  if(dieta.giorni[AB.editDay]&&dieta.giorni[AB.editDay][pId])
    dieta.giorni[AB.editDay][pId].splice(fi,1);
  updatePatient(pat);
  renderConfigAB();
}

function toggleAB(){
  el('abOptions').style.display=el('abEnabled').checked?'block':'none';
}

async function saveConfigAB(){
  var pat=ensureDieta(getPatientById(S.patientId));
  pat.configAB={
    enabled:el('abEnabled').checked,
    startDate:el('abStartDate').value,
    durata:parseInt(el('abDurata').value)||8
  };
  await updatePatient(pat);
  showToast('✅ Impostazioni salvate!');
}

// ── STAMPA // ── PRINT MODAL ──────────────────────────────────────────────────────────────
var _printPatId = null;
function openPrintModal(patId){
  _printPatId = patId;
  var pat = getPatientById(patId);
  if(!pat){ showToast('Paziente non trovato'); return; }
  var cfg = pat.configAB||{};
  var now = new Date();
  var dow = now.getDay()===0?6:now.getDay()-1;
  var mon = new Date(now); mon.setDate(now.getDate()-dow);
  var defaultStart = mon.toISOString().split('T')[0];

  // Build and inject HTML
  var content = el('modalPrintContent');
  content.innerHTML = '';

  var handle = document.createElement('div');
  handle.className = 'modal-handle';
  content.appendChild(handle);

  var title = document.createElement('div');
  title.className = 'modal-title';
  title.textContent = 'Stampa piano alimentare';
  content.appendChild(title);

  var banner = document.createElement('div');
  banner.style.cssText = 'background:var(--blue-l);border-radius:var(--rs);padding:10px 14px;margin-bottom:14px;font-size:13px;color:var(--blue-d)';
  banner.innerHTML = 'Paziente: <strong>'+pat.nome+'</strong>';
  content.appendChild(banner);

  var lbl1 = document.createElement('label');
  lbl1.className = 'lbl'; lbl1.textContent = 'Data di inizio (lunedì della settimana)';
  content.appendChild(lbl1);

  var dateInp = document.createElement('input');
  dateInp.type = 'date'; dateInp.className = 'inp'; dateInp.id = 'printStartDate';
  dateInp.value = defaultStart;
  content.appendChild(dateInp);

  var lbl2 = document.createElement('label');
  lbl2.className = 'lbl'; lbl2.textContent = 'Numero di settimane da stampare';
  content.appendChild(lbl2);

  var sel = document.createElement('select');
  sel.className = 'inp'; sel.id = 'printWeeks';
  [{v:'1',t:'1 settimana'},{v:'2',t:'2 settimane',sel:true},{v:'4',t:'4 settimane'},{v:'8',t:'8 settimane'},{v:'12',t:'12 settimane'}].forEach(function(o){
    var opt = document.createElement('option');
    opt.value = o.v; opt.textContent = o.t;
    if(o.sel) opt.selected = true;
    sel.appendChild(opt);
  });
  content.appendChild(sel);

  if(cfg.enabled){
    var abNote = document.createElement('div');
    abNote.style.cssText = 'background:var(--purple-l);border-radius:var(--rs);padding:10px 14px;margin:10px 0;font-size:12px;color:var(--purple-d)';
    abNote.textContent = 'Dieta A/B attiva — ogni settimana mostrerà la dieta corretta automaticamente';
    content.appendChild(abNote);
  }

  var btnPrint = document.createElement('button');
  btnPrint.className = 'btn-full btn-prim';
  btnPrint.style.marginTop = '8px';
  btnPrint.textContent = 'Stampa ora';
  btnPrint.onclick = function(){ eseguiStampa(); };
  content.appendChild(btnPrint);

  var btnCancel = document.createElement('button');
  btnCancel.className = 'btn-full btn-sec';
  btnCancel.textContent = 'Annulla';
  btnCancel.onclick = function(){ closeModal('modalPrint'); };
  content.appendChild(btnCancel);

  openModal('modalPrint');
}

function eseguiStampa(){
  // Read values before closing modal
  var startInp = el('printStartDate');
  var weeksInp = el('printWeeks');
  if(!startInp || !weeksInp){
    showToast('⚠️ Errore nel modulo di stampa');
    return;
  }
  var startDateVal = startInp.value;
  var numWeeks = parseInt(weeksInp.value)||1;
  if(!startDateVal){
    showToast('⚠️ Seleziona una data di inizio');
    return;
  }
  closeModal('modalPrint');
  setTimeout(function(){ printMultiWeek(_printPatId, startDateVal, numWeeks); }, 300);
}

// ── STAMPA ────────────────────────────────────────────────────────────────────
function printDieta(patId){ openPrintModal(patId); }

function printMultiWeek(patId, startDateStr, numWeeks){
  var pc=S.nutriId?getPrintColors():{primary:'#1a1a1a',accent:'#374151'};
  var pat=getPatientById(patId);
  if(!pat){showToast('Paziente non trovato');return;}
  var obj=pat.obiettivi||{kcal:1800,p:150,c:180,f:55};
  var startDate = startDateStr ? new Date(startDateStr) : new Date();
  // Normalizza a lunedì della settimana scelta
  var dow = startDate.getDay()===0?6:startDate.getDay()-1;
  startDate.setDate(startDate.getDate()-dow);
  var now = new Date();
  var cfgStart = (pat.configAB&&pat.configAB.startDate) ? new Date(pat.configAB.startDate) : now;

  var GG_FULL=['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
  var PASTI_P=[
    {id:'colazione',nome:'Colazione',ora:'07:30'},
    {id:'spuntino_m',nome:'Spuntino',ora:'10:30'},
    {id:'pranzo',nome:'Pranzo',ora:'13:00'},
    {id:'merenda',nome:'Merenda',ora:'16:30'},
    {id:'cena',nome:'Cena',ora:'19:30'}
  ];
  var MM_S=['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'];

  var html='';
  var allWeekTotals=[];

  // ── UNA PAGINA PER SETTIMANA (o due settimane per pagina se poche) ──
  for(var w=0; w<numWeeks; w++){
    var weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + w*7);
    var weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate()+6);

    // Calcola quale dieta tocca questa settimana
    var weeksFromCfg = Math.floor((weekStart - cfgStart)/(7*24*60*60*1000));
    var cfg = pat.configAB||{};
    var abActive = cfg.enabled && cfg.startDate && (cfg.durata===0||weeksFromCfg<cfg.durata) && weeksFromCfg>=0;
    var dietaKey = '';
    var dieta;
    if(abActive){
      dietaKey = weeksFromCfg%2===0 ? 'A' : 'B';
      dieta = (dietaKey==='A' ? pat.dietaA : pat.dietaB)||pat.dieta||{giorni:{}};
    } else {
      dieta = pat.dieta||{giorni:{}};
    }
    var giorni = dieta.giorni||{};

    // Calcola totali settimana
    var weekTotals=[];
    for(var d=0;d<7;d++){
      var g=giorni[d]||{};
      var kcal=0,p=0,c=0,f=0;
      PASTI_P.forEach(function(pm){(g[pm.id]||[]).forEach(function(food){kcal+=food.kcal||0;p+=food.p||0;c+=food.c||0;f+=food.fat||food.f||0;});});
      weekTotals.push({kcal:r(kcal),p:r(p,1),c:r(c,1),f:r(f,1)});
    }
    allWeekTotals.push({week:w+1,key:dietaKey,totals:weekTotals,start:weekStart,end:weekEnd});

    var weekLabel = 'Settimana '+(w+1)
      +' &nbsp;·&nbsp; '+weekStart.getDate()+' '+MM_S[weekStart.getMonth()]
      +' – '+weekEnd.getDate()+' '+MM_S[weekEnd.getMonth()]+' '+weekEnd.getFullYear()
      +(dietaKey?' &nbsp;·&nbsp; Dieta '+dietaKey:'');

    if(w>0) html+='<div style="page-break-before:always"></div>';
    html+='<div class="p-page">';

    // Header solo prima settimana
    if(w===0){
      html+='<div class="p-doc-header">'
        +'<div class="p-logo-line"><div class="p-logo-mark"><svg viewBox="0 0 20 20" width="20" height="20" fill="white"><path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 11.2c-2.7 0-5-1.4-6.4-3.4.6-1.1 3.4-1.8 6.4-1.8s5.8.7 6.4 1.8c-1.4 2-3.7 3.4-6.4 3.4z"/></svg></div>'
        +'<div class="p-studio-name">Piano Alimentare Personalizzato</div></div>'
        +'<div class="p-paziente-nome">'+pat.nome+'</div>'
        +'<div class="p-paziente-meta">Emesso il '+now.getDate()+'/'+('0'+(now.getMonth()+1)).slice(-2)+'/'+now.getFullYear()
        +'&nbsp;&nbsp;|&nbsp;&nbsp;'+numWeeks+(numWeeks===1?' settimana':' settimane')+' di piano</div>'
        +'<div class="p-obiettivi-bar">'
        +'<div class="p-ob"><div class="p-ob-val">'+obj.kcal+'</div><div class="p-ob-lbl">kcal / die</div></div>'
        +'<div class="p-ob"><div class="p-ob-val">'+obj.p+'g</div><div class="p-ob-lbl">Proteine</div></div>'
        +'<div class="p-ob"><div class="p-ob-val">'+obj.c+'g</div><div class="p-ob-lbl">Carboidrati</div></div>'
        +'<div class="p-ob"><div class="p-ob-val">'+obj.f+'g</div><div class="p-ob-lbl">Grassi</div></div>'
        +'</div></div>';
    }

    // Titolo settimana
    html+='<div style="background:'+pc.primary+';color:white;padding:8px 14px;border-radius:4px;margin-bottom:12px;font-size:12px;font-weight:700;letter-spacing:.04em">'+weekLabel+'</div>';

    // Giorni
    for(var i=0;i<7;i++){
      var g2=giorni[i]||{};
      var note2=g2.note||{};
      var tot=weekTotals[i];
      var hasFood=PASTI_P.some(function(pm){return (g2[pm.id]||[]).length>0;});
      if(!hasFood) continue;

      var dayDate=new Date(weekStart);dayDate.setDate(weekStart.getDate()+i);

      html+='<div class="p-day"><div class="p-day-header" style="background:'+pc.primary+'">'
        +'<span class="p-day-name">'+GG_FULL[i]+'&nbsp;<span style="font-weight:400;opacity:.6;font-size:10px">'+dayDate.getDate()+'/'+('0'+(dayDate.getMonth()+1)).slice(-2)+'</span></span>'
        +'<span class="p-day-kcal">'+tot.kcal+' kcal &nbsp;|&nbsp; P '+tot.p+'g &nbsp; C '+tot.c+'g &nbsp; G '+tot.f+'g</span>'
        +'</div><table class="p-meals-table">';

      PASTI_P.forEach(function(pm){
        var cibi=g2[pm.id]||[];
        if(!cibi.length) return;
        var pk=r(cibi.reduce(function(s,f){return s+(f.kcal||0);},0));
        var pp=r(cibi.reduce(function(s,f){return s+(f.p||0);},0),1);
        var pc=r(cibi.reduce(function(s,f){return s+(f.c||0);},0),1);
        var pf=r(cibi.reduce(function(s,f){return s+(f.fat||f.f||0);},0),1);
        html+='<tr><td class="p-meal-col"><span class="p-meal-name">'+pm.nome+'</span><span class="p-meal-time">'+pm.ora+'</span></td>'
          +'<td class="p-foods-col">'
          +cibi.map(function(food){return '<div class="p-food-item"><span class="p-food-name">'+food.n+'</span><span class="p-food-qty">'+(food.q&&food.q!=='—'?food.q:'')+'</span><span class="p-food-kcal">'+r(food.kcal||0)+' kcal</span></div>';}).join('')
          +(note2[pm.id]?'<div class="p-nota">'+note2[pm.id]+'</div>':'')
          +'</td><td class="p-kcal-col"><div class="p-pasto-kcal">'+pk+' kcal</div><div class="p-macro-row">P'+pp+' C'+pc+' G'+pf+'</div></td></tr>';
      });
      html+='</table></div>';
    }
    html+='<div class="p-footer"><span>'+pat.nome+'</span><span>Settimana '+(w+1)+'/'+numWeeks+(dietaKey?' — Dieta '+dietaKey:'')+'</span><span></span></div></div>';
  }

  // ── RIEPILOGO FINALE (solo se >1 settimana) ──
  if(numWeeks>1){
    var maxK2=0;
    allWeekTotals.forEach(function(wt){wt.totals.forEach(function(t){if(t.kcal>maxK2)maxK2=t.kcal;});});
    html+='<div style="page-break-before:always"></div><div class="p-page">';
    html+='<div class="p-doc-header" style="margin-bottom:16px">'
      +'<div class="p-paziente-nome" style="font-size:18px">Riepilogo '+numWeeks+' settimane</div>'
      +'<div class="p-paziente-meta">'+pat.nome+'</div></div>';
    allWeekTotals.forEach(function(wt){
      var avgK=r(wt.totals.reduce(function(s,t){return s+t.kcal;},0)/7);
      var pct=maxK2>0?r(avgK/maxK2*100):0;
      html+='<div class="p-summary-row">'
        +'<span class="p-sum-day">Sett. '+wt.week+(wt.key?' ('+wt.key+')':'')+'</span>'
        +'<span class="p-sum-kcal">'+avgK+' kcal</span>'
        +'<div class="p-sum-bar-wrap"><div class="p-sum-bar" style="width:'+pct+'%"></div></div>'
        +'<span class="p-sum-macros">'+wt.start.getDate()+'/'+('0'+(wt.start.getMonth()+1)).slice(-2)+' – '+wt.end.getDate()+'/'+('0'+(wt.end.getMonth()+1)).slice(-2)+'</span>'
        +'</div>';
    });
    html+='<div class="p-footer"><span>'+pat.nome+' — Riepilogo piano</span><span></span><span></span></div></div>';
  }

  el('print-area').innerHTML=html;
  setTimeout(function(){window.print();setTimeout(function(){el('print-area').innerHTML='';},1500);},200);
}

// ── MODAL UTILS ───────────────────────────────────────────────────────────────
document.querySelectorAll('.modal-bg').forEach(function(bg){
  bg.addEventListener('click',function(e){
    // Non chiudere se si clicca sui suggerimenti
    if(e.target===bg){bg.classList.remove('open');closeSugg();}
  });
});
// Chiudi suggerimenti solo cliccando fuori, non quando si scrolla dentro
document.addEventListener('click',function(e){
  var box=el('suggestions');
  var inp=el('searchInp');
  if(box&&inp&&!box.contains(e.target)&&e.target!==inp){
    closeSugg();
  }
});

// ── PWA INSTALL ───────────────────────────────────────────────────────────────
var deferredPrompt=null;
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferredPrompt=e;var b=el('installBanner');if(b)b.classList.add('vis');});
function installPWA(){if(!deferredPrompt)return;deferredPrompt.prompt();deferredPrompt.userChoice.then(function(r){deferredPrompt=null;var b=el('installBanner');if(b)b.classList.remove('vis');if(r.outcome==='accepted')showToast('✅ App installata!');});}
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(function(){});

// ── INIT ──────────────────────────────────────────────────────────────────────
// ── DATI DI TEST ─────────────────────────────────────────────────────────────
async function creaAccountTest(){
  showToast('⏳ Creazione account in corso...',5000);
  try {
  // Controlla se esistono già
  var accs = await loadNutriAccounts();
  var nutri = accs.find(function(a){return a.user==='dott.bianchi';});
  if(!nutri){
    nutri = {id:'test-nutri-001', nome:'Dott.ssa Maria Bianchi', user:'dott.bianchi', passHash:hashPass('test1234')};
    await fsSet('nutrizionisti', nutri.id, nutri);
  }
  // Elimina paziente test esistente per ricrearlo pulito
  var snap = await db.collection('pazienti').where('nutriId','==','test-nutri-001').get();
  if(!snap.empty){
    await Promise.all(snap.docs.map(function(d){return d.ref.delete();}));
  }
  // Crea sempre il paziente test da zero
  if(true){
    var pat = {
      id:'test-paz-001',
      nutriId:'test-nutri-001',
      nome:'Giuseppe Rossi',
      note:'35 anni, obiettivo dimagrimento, intollerante al lattosio, allena 3v/settimana',
      codice:'GIUSEPPE-2025',
      obiettivi:{kcal:1800,p:150,c:180,f:55},
      dieta:{giorni:{}},
      dietaA:{giorni:{}},
      dietaB:{giorni:{}},
      configAB:{enabled:false,startDate:'',durata:8}
    };
    // Popola dieta con dati realistici
    var giorniBase = {
      0:{
        colazione:[{n:"Fiocchi d'avena",q:"60g",kcal:227,p:7.8,c:39.6,fat:4.2,fi:5.4},{n:"Fage Total 0%",q:"150g",kcal:86,p:15.5,c:5.3,fat:0.3,fi:0},{n:"Mirtilli",q:"80g",kcal:46,p:0.6,c:11.2,fat:0.2,fi:1.9}],
        spuntino_m:[{n:"Mela",q:"150g",kcal:78,p:0.5,c:19.5,fat:0.3,fi:3.6}],
        pranzo:[{n:"Riso integrale cotto",q:"180g",kcal:198,p:4,c:41.4,fat:1.6,fi:3.2},{n:"Petto di pollo cotto",q:"150g",kcal:248,p:46.5,c:0,fat:5.4,fi:0},{n:"Zucchine cotte",q:"200g",kcal:34,p:2.6,c:5,fat:0.4,fi:2}],
        merenda:[{n:"MyProtein Whey Protein Cioccolato",q:"30g",kcal:116,p:23.7,c:2,fat:2.1,fi:0.3}],
        cena:[{n:"Salmone fresco",q:"180g",kcal:374,p:36,c:0,fat:25.2,fi:0},{n:"Patata bollita",q:"150g",kcal:116,p:3,c:25.4,fat:0.2,fi:2.7},{n:"Insalata mista",q:"100g",kcal:15,p:1.2,c:1.8,fat:0.3,fi:2}],
        note:{pranzo:"Condire con 1 cucchiaio olio EVO a crudo",cena:"Cottura al vapore o al cartoccio"}
      },
      1:{
        colazione:[{n:"Uovo intero",q:"2 uova (100g)",kcal:150,p:13,c:0.6,fat:11,fi:0},{n:"Pane integrale",q:"50g",kcal:112,p:4.3,c:21,fat:1,fi:3.3}],
        spuntino_m:[{n:"Banana",q:"120g",kcal:107,p:1.3,c:26.4,fat:0.4,fi:3.1}],
        pranzo:[{n:"Pasta integrale cotta",q:"180g",kcal:223,p:8.1,c:43.2,fat:1.8,fi:5.4},{n:"Tonno al naturale",q:"160g",kcal:166,p:38.4,c:0,fat:1.6,fi:0},{n:"Pomodorini",q:"100g",kcal:18,p:0.9,c:3.5,fat:0.2,fi:1.2}],
        merenda:[{n:"Net Integratori Whey Protein Cacao",q:"30g",kcal:116,p:23.4,c:2,fat:2.1,fi:0.3}],
        cena:[{n:"Petto di tacchino cotto",q:"200g",kcal:314,p:58,c:0,fat:7.6,fi:0},{n:"Broccoli cotti",q:"200g",kcal:68,p:5.6,c:10,fat:0.8,fi:5.2}],
        note:{cena:"Cuocere alla piastra senza olio"}
      },
      2:{
        colazione:[{n:"Fage Total 0%",q:"200g",kcal:114,p:20.6,c:7,fat:0.4,fi:0},{n:"Fiocchi di avena",q:"50g",kcal:189,p:6.5,c:33,fat:3.5,fi:5},{n:"Fragole",q:"100g",kcal:32,p:0.7,c:7.1,fat:0.3,fi:2}],
        spuntino_m:[{n:"Mandorle",q:"25g",kcal:145,p:5.3,c:5.5,fat:12.5,fi:3.1}],
        pranzo:[{n:"Quinoa cotta",q:"180g",kcal:216,p:7.9,c:38.3,fat:3.2,fi:5},{n:"Ceci cotti",q:"150g",kcal:210,p:11.3,c:34,fat:3,fi:9},{n:"Spinaci crudi",q:"100g",kcal:23,p:2.9,c:1.4,fat:0.4,fi:2.2}],
        merenda:[{n:"Pera",q:"150g",kcal:86,p:0.6,c:19.5,fat:0.2,fi:4.7}],
        cena:[{n:"Branzino al vapore",q:"220g",kcal:180,p:39.6,c:0,fat:4.4,fi:0},{n:"Asparagi",q:"200g",kcal:40,p:4.4,c:4,fat:0.4,fi:4.2}],
        note:{pranzo:"Aggiungere limone e prezzemolo fresco"}
      },
      3:{
        colazione:[{n:"Kellogg Special K",q:"40g",kcal:148,p:6.4,c:28,fat:0.6,fi:1.4},{n:"Latte p. scremato",q:"200ml",kcal:92,p:6.8,c:9.6,fat:3,fi:0}],
        spuntino_m:[{n:"Arancia",q:"200g",kcal:94,p:1.8,c:23.4,fat:0.2,fi:4.8}],
        pranzo:[{n:"Orzo perlato cotto",q:"180g",kcal:221,p:4.5,c:50.4,fat:0.7,fi:1.8},{n:"Gamberetti",q:"200g",kcal:160,p:34,c:1,fat:2,fi:0},{n:"Rucola",q:"60g",kcal:15,p:1.6,c:1.2,fat:0.4,fi:1}],
        merenda:[{n:"Fage Total 0%",q:"125g",kcal:71,p:12.9,c:4.4,fat:0.3,fi:0}],
        cena:[{n:"Pollo arrosto",q:"200g",kcal:390,p:46,c:0,fat:23,fi:0},{n:"Fagiolini cotti",q:"200g",kcal:50,p:4,c:9,fat:0.2,fi:6}],
        note:{merenda:"Aggiungere 1 cucchiaino di miele se gradito"}
      },
      4:{
        colazione:[{n:"Pancakes integrali",q:"2 pezzi (120g)",kcal:220,p:7,c:32,fat:7,fi:1},{n:"Sciroppo acero",q:"15ml",kcal:39,p:0,c:10,fat:0,fi:0}],
        spuntino_m:[{n:"Kiwi",q:"2 frutti (200g)",kcal:122,p:2.2,c:29.4,fat:1,fi:6}],
        pranzo:[{n:"Farro cotto",q:"180g",kcal:270,p:12.6,c:73.8,fat:1.8,fi:7.2},{n:"Bistecca magra",q:"150g",kcal:261,p:42,c:0,fat:9.8,fi:0},{n:"Peperone rosso",q:"150g",kcal:47,p:1.5,c:9,fat:0.5,fi:3.2}],
        merenda:[{n:"Grenade Carb Killa Bar",q:"60g",kcal:221,p:18.6,c:23.4,fat:5.4,fi:3}],
        cena:[{n:"Orata al forno",q:"250g",kcal:273,p:47.5,c:0,fat:10,fi:0},{n:"Patata dolce cotta",q:"150g",kcal:135,p:3,c:31.5,fat:0.2,fi:4.5}],
        note:{cena:"Al forno con erbe aromatiche e limone"}
      },
      5:{
        colazione:[{n:"Yogurt Muller Corner Fragola",q:"175g",kcal:194,p:6.6,c:31.5,fat:4.4,fi:0.5},{n:"Gallette di riso",q:"3 gallette",kcal:116,p:2.1,c:25.2,fat:0.9,fi:0.6}],
        spuntino_m:[{n:"Fragole",q:"200g",kcal:64,p:1.4,c:14.2,fat:0.6,fi:4}],
        pranzo:[{n:"Pizza margherita",q:"250g",kcal:588,p:25,c:80,fat:20,fi:5}],
        merenda:[{n:"Cioccolato fondente 85%",q:"20g",kcal:113,p:2,c:5.8,fat:9.6,fi:2.2}],
        cena:[{n:"Minestrone di verdure",q:"400ml",kcal:180,p:10,c:28,fat:4,fi:10},{n:"Pane integrale",q:"40g",kcal:90,p:3.4,c:16.8,fat:0.8,fi:2.6}],
        note:{pranzo:"Giorno libero — goditi ogni morso con moderazione!"}
      },
      6:{
        colazione:[{n:"Uova al tegamino",q:"2 uova",kcal:150,p:13,c:0.6,fat:11,fi:0},{n:"Avocado",q:"75g",kcal:120,p:1.5,c:6.4,fat:11.3,fi:5.1},{n:"Pane di segale",q:"50g",kcal:110,p:4,c:22.5,fat:0.9,fi:3}],
        spuntino_m:[{n:"Ananas fresco",q:"150g",kcal:75,p:0.8,c:19.5,fat:0.2,fi:2.1}],
        pranzo:[{n:"Risotto ai funghi",q:"350g",kcal:595,p:15.8,c:105,fat:15.8,fi:7}],
        merenda:[{n:"Fage Total 0%",q:"125g",kcal:71,p:12.9,c:4.4,fat:0.3,fi:0}],
        cena:[{n:"Orata al vapore",q:"250g",kcal:273,p:47.5,c:0,fat:10,fi:0},{n:"Verdure miste al vapore",q:"200g",kcal:50,p:3,c:8,fat:0.5,fi:4}],
        note:{pranzo:"Domenica in famiglia — pasto condiviso"}
      }
    };
    for(var i=0;i<7;i++){
      pat.dieta.giorni[i]=giorniBase[i];
      pat.dietaA.giorni[i]=JSON.parse(JSON.stringify(giorniBase[i]));
      pat.dietaB.giorni[i]={colazione:[],spuntino_m:[],pranzo:[],merenda:[],cena:[],note:{}};
    }
    // Dieta B esempio (diversa da A)
    pat.dietaB.giorni[0].colazione=[{n:"MyProtein Whey Protein Vaniglia",q:"35g",kcal:139,p:28,c:2.3,fat:2.6,fi:0.4},{n:"Banana",q:"120g",kcal:107,p:1.3,c:26.4,fat:0.4,fi:3.1}];
    pat.dietaB.giorni[0].pranzo=[{n:"Pasta di semola cotta",q:"180g",kcal:279,p:9.9,c:54,fat:1.6,fi:2.5},{n:"Tonno al naturale",q:"160g",kcal:166,p:38.4,c:0,fat:1.6,fi:0}];
    pat.dietaB.giorni[0].cena=[{n:"Petto di pollo cotto",q:"200g",kcal:330,p:62,c:0,fat:7.2,fi:0},{n:"Riso basmati cotto",q:"150g",kcal:222,p:3.6,c:46.5,fat:0.6,fi:0.9}];
    _patients=[pat];
    await fsSet('pazienti',pat.id,pat);
  } else {
    _patients = snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
  }

  // ── MISURAZIONI TEST — 6 mesi di storico ──
  // Elimina misurazioni test esistenti e ricrea
  var mSnap = await db.collection('misurazioni').where('patId','==','test-paz-001').get();
  await Promise.all(mSnap.docs.map(function(d){return d.ref.delete();}));

  var misurazioniTest = [
    // 6 mesi fa — Prima visita
    { id:'test-m-01', data:'2024-10-14', tipo_visita:'Prima visita',
      peso:88.5, altezza:178, eta:35,
      fm_perc:28.4, mm_kg:52.1, acqua_perc:51.2, osso_kg:3.8, viscerale:14, metabolismo:1820,
      vita:98, fianchi:105, torace:102, braccio_dx:34, braccio_sx:33.5, coscia_dx:58, coscia_sx:57.5,
      plica_tricipite:22, plica_bicipite:14, plica_addome:28, plica_coscia:32,
      glicemia:98, colest_tot:195, colest_ldl:128, colest_hdl:42, trigliceridi:145, vit_d:22, tsh:1.8,
      pressione:'130/85',
      note_cliniche:'Prima visita. Paziente motivato, lavoro sedentario. Leggera ipertensione borderline. Sovrappeso con accumulo addominale.',
      obiettivo_attuale:'Perdere 8-10 kg in 6 mesi. Ridurre grasso viscerale. Migliorare parametri metabolici.'
    },
    // 5 mesi fa
    { id:'test-m-02', data:'2024-11-11', tipo_visita:'Controllo mensile',
      peso:86.2, altezza:178, eta:35,
      fm_perc:27.1, mm_kg:52.4, acqua_perc:52.0, osso_kg:3.8, viscerale:13, metabolismo:1835,
      vita:95.5, fianchi:103, torace:100.5, braccio_dx:33.5, braccio_sx:33, coscia_dx:57, coscia_sx:56.5,
      plica_tricipite:20, plica_bicipite:13, plica_addome:25, plica_coscia:30,
      glicemia:95, colest_tot:188, colest_ldl:122, colest_hdl:44, trigliceridi:132, vit_d:24, tsh:1.7,
      pressione:'128/82',
      note_cliniche:'Buona compliance alla dieta. Iniziato allenamento 3x/settimana. Lieve miglioramento pressione.',
      obiettivo_attuale:'Continuare il percorso. Aumentare proteine post-allenamento.'
    },
    // 4 mesi fa
    { id:'test-m-03', data:'2024-12-09', tipo_visita:'Controllo mensile',
      peso:84.8, altezza:178, eta:35,
      fm_perc:26.2, mm_kg:52.8, acqua_perc:52.5, osso_kg:3.8, viscerale:12, metabolismo:1848,
      vita:93, fianchi:101.5, torace:99, braccio_dx:33.5, braccio_sx:33, coscia_dx:56, coscia_sx:55.5,
      plica_tricipite:19, plica_bicipite:12.5, plica_addome:23, plica_coscia:29,
      glicemia:91, colest_tot:182, colest_ldl:115, colest_hdl:46, trigliceridi:118, vit_d:26, tsh:1.8,
      pressione:'125/80',
      note_cliniche:'Eccellenti progressi. Pressione normalizzata. Aumento massa muscolare visibile. Paziente molto motivato.',
      obiettivo_attuale:'Mantenere il ritmo. Attenzione alle feste di Natale — piano libero moderato.'
    },
    // 3 mesi fa
    { id:'test-m-04', data:'2025-01-13', tipo_visita:'Controllo mensile',
      peso:84.1, altezza:178, eta:35,
      fm_perc:25.8, mm_kg:53.0, acqua_perc:52.8, osso_kg:3.9, viscerale:11, metabolismo:1855,
      vita:91.5, fianchi:100, torace:98, braccio_dx:34, braccio_sx:33.5, coscia_dx:55.5, coscia_sx:55,
      plica_tricipite:18, plica_bicipite:12, plica_addome:21, plica_coscia:27.5,
      glicemia:89, colest_tot:178, colest_ldl:110, colest_hdl:48, trigliceridi:108, vit_d:28, tsh:1.7,
      pressione:'122/78',
      note_cliniche:'Leggero plateau dopo le feste ma risultati stabili. Ottimo profilo lipidico in miglioramento.',
      obiettivo_attuale:'Superare il plateau con variazione calorica ciclica. Aumentare cardio moderato.'
    },
    // 2 mesi fa
    { id:'test-m-05', data:'2025-02-10', tipo_visita:'Controllo mensile',
      peso:82.3, altezza:178, eta:35,
      fm_perc:24.6, mm_kg:53.5, acqua_perc:53.4, osso_kg:3.9, viscerale:10, metabolismo:1870,
      vita:89, fianchi:98.5, torace:97, braccio_dx:34.5, braccio_sx:34, coscia_dx:54.5, coscia_sx:54,
      plica_tricipite:16.5, plica_bicipite:11, plica_addome:19, plica_coscia:26,
      glicemia:86, colest_tot:172, colest_ldl:105, colest_hdl:50, trigliceridi:98, vit_d:30, tsh:1.6,
      pressione:'120/76',
      note_cliniche:'Ottimo superamento del plateau. Composizione corporea in netto miglioramento. Paziente soddisfatto.',
      obiettivo_attuale:'Ultimi 3-4 kg. Mantenere massa muscolare acquisita.'
    },
    // 1 mese fa — ultimo controllo
    { id:'test-m-06', data:'2025-03-10', tipo_visita:'Controllo mensile',
      peso:80.8, altezza:178, eta:35,
      fm_perc:23.1, mm_kg:54.2, acqua_perc:54.1, osso_kg:3.9, viscerale:9, metabolismo:1888,
      vita:86.5, fianchi:96, torace:95.5, braccio_dx:35, braccio_sx:34.5, coscia_dx:53.5, coscia_sx:53,
      plica_tricipite:15, plica_bicipite:10, plica_addome:17, plica_coscia:24.5,
      glicemia:84, colest_tot:168, colest_hdl:53, colest_ldl:99, trigliceridi:88, vit_d:32, tsh:1.7,
      pressione:'118/76',
      note_cliniche:'Risultati eccellenti in 5 mesi. Peso -7.7kg, FM% -5.3%, massa muscolare +2.1kg. Pressione normalizzata, profilo lipidico ottimale.',
      obiettivo_attuale:'Fase di mantenimento. Obiettivo peso 78-79kg. Continuare attività fisica regolare.'
    }
  ];

  // Salva misurazioni una alla volta con feedback
  showToast('⏳ Salvataggio misurazioni (0/'+misurazioniTest.length+')...', 10000);
  var salvate = 0;
  var errori = [];
  for(var mi=0; mi<misurazioniTest.length; mi++){
    var m = misurazioniTest[mi];
    var docId = m.id;
    var toSave = Object.assign({}, m, {
      patId: 'test-paz-001',
      nutriId: 'test-nutri-001',
      updatedAt: new Date().toISOString()
    });
    delete toSave.id;
    try {
      await db.collection('misurazioni').doc(docId).set(toSave);
      salvate++;
      showToast('⏳ Salvate '+salvate+'/'+misurazioniTest.length+' misurazioni...', 8000);
    } catch(me) {
      console.error('Errore misurazione '+docId+':', me);
      errori.push(docId+': '+me.message);
    }
  }

  if(errori.length > 0){
    showToast('⚠️ '+salvate+' misurazioni salvate, '+errori.length+' errori: '+errori[0], 8000);
    console.error('Errori misurazioni:', errori);
  } else {
    showToast('✅ Account test pronti! '+salvate+' misurazioni caricate.',4000);
  }

  setTimeout(function(){
    alert('✅ Account test creati!\n\n👨‍⚕️ NUTRIZIONISTA\nUsername: dott.bianchi\nPassword: test1234\n\n👤 PAZIENTE\nCodice accesso: GIUSEPPE-2025\n\nMisurazioni caricate: '+salvate+'/'+misurazioniTest.length);
  },500);
  } catch(err) {
    showToast('❌ Errore generale: '+err.message, 8000);
    console.error('Test account error:', err);
  }
}

window.creaAccountTest = creaAccountTest;
window.openNuovaMisurazione = openNuovaMisurazione;
window.openEditMisurazione = openEditMisurazione;
window.saveMisurazioneFromModal = saveMisurazioneFromModal;
window.confermaCancellaMisurazione = confermaCancellaMisurazione;
window.uploadLogo = uploadLogo;
window.removeLogo = removeLogo;
window.getNutriLogo = getNutriLogo;
window.triggerLogoUpload = triggerLogoUpload;
window.loadLogoFromFirestore = loadLogoFromFirestore;
window.getPrintColors = getPrintColors;
window.setPrintColor = setPrintColor;
window.resetPrintColors = resetPrintColors;
window.openPrintModal = openPrintModal;
window.eseguiStampa = eseguiStampa;
window.printMultiWeek = printMultiWeek;
window.isDietaABActive = isDietaABActive;

(async function init(){
  var sess=getSession();
  if(sess){
    el('btnLogin').textContent='Caricamento...';
    try{
      if(sess.role==='nutrizionista'){
        var acc=await fsGet('nutrizionisti',sess.nutriId);
        if(acc){await startApp('nutrizionista',acc);return;}
      }else if(sess.role==='paziente'){
        var pat=await fsGet('pazienti',sess.patientId);
        if(pat){_patients=[pat];await startApp('paziente',pat);return;}
      }
    }catch(e){console.warn('Session restore failed',e);}
    el('btnLogin').textContent='Accedi';
  }
  el('loginScreen').style.display='flex';
})();

// ── MONITORAGGIO ANTROPOMETRICO ───────────────────────────────────────────────

var MON = { editingId: null }; // id della misurazione in modifica

// Campi misurazione — tutti i dati antropometrici professionali
var MON_FIELDS = [
  // Biometria base
  { id:'peso',      label:'Peso',          unit:'kg',  step:'0.1', group:'base',    icon:'⚖️' },
  { id:'altezza',   label:'Altezza',        unit:'cm',  step:'0.5', group:'base',    icon:'📏' },
  { id:'bmi',       label:'BMI',            unit:'',    step:'0.01',group:'base',    icon:'📊', computed:true },
  { id:'eta',       label:'Età',            unit:'anni',step:'1',   group:'base',    icon:'🎂' },
  // Composizione corporea
  { id:'fm_perc',   label:'% Massa Grassa', unit:'%',   step:'0.1', group:'comp',    icon:'🔴' },
  { id:'fm_kg',     label:'Massa Grassa',   unit:'kg',  step:'0.1', group:'comp',    icon:'🔴', computed:true },
  { id:'ffm_perc',  label:'% Massa Magra',  unit:'%',   step:'0.1', group:'comp',    icon:'🔵', computed:true },
  { id:'ffm_kg',    label:'Massa Magra',    unit:'kg',  step:'0.1', group:'comp',    icon:'🔵', computed:true },
  { id:'mm_kg',     label:'Massa Muscolare',unit:'kg',  step:'0.1', group:'comp',    icon:'💪' },
  { id:'mm_perc',   label:'% Muscolare',    unit:'%',   step:'0.1', group:'comp',    icon:'💪', computed:true },
  { id:'acqua_perc',label:'% Acqua',        unit:'%',   step:'0.1', group:'comp',    icon:'💧' },
  { id:'acqua_kg',  label:'Acqua totale',   unit:'kg',  step:'0.1', group:'comp',    icon:'💧', computed:true },
  { id:'osso_kg',   label:'Massa Ossea',    unit:'kg',  step:'0.01',group:'comp',    icon:'🦴' },
  { id:'viscerale', label:'Grasso Viscerale',unit:'',   step:'0.1', group:'comp',    icon:'🫀' },
  { id:'metabolismo',label:'Metabolismo Basale',unit:'kcal',step:'1',group:'comp',   icon:'🔥' },
  // Circonferenze
  { id:'vita',      label:'Vita',           unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'fianchi',   label:'Fianchi',        unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'whr',       label:'WHR (vita/fianchi)',unit:'', step:'0.01',group:'circ',    icon:'📐', computed:true },
  { id:'torace',    label:'Torace',         unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'braccio_dx',label:'Braccio dx',     unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'braccio_sx',label:'Braccio sx',     unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'coscia_dx', label:'Coscia dx',      unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'coscia_sx', label:'Coscia sx',      unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'polpaccio_dx',label:'Polpaccio dx', unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'polpaccio_sx',label:'Polpaccio sx', unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'collo',     label:'Collo',          unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'addome',    label:'Addome',         unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  { id:'ombelico',  label:'All\'ombelico',  unit:'cm',  step:'0.5', group:'circ',    icon:'📐' },
  // Pliche cutanee (plicometria)
  { id:'plica_tricipite',label:'Plica Tricipite',unit:'mm',step:'0.5',group:'pliche',icon:'🤏' },
  { id:'plica_bicipite', label:'Plica Bicipite', unit:'mm',step:'0.5',group:'pliche',icon:'🤏' },
  { id:'plica_pettorale',label:'Plica Pettorale',unit:'mm',step:'0.5',group:'pliche',icon:'🤏' },
  { id:'plica_addome',   label:'Plica Addominale',unit:'mm',step:'0.5',group:'pliche',icon:'🤏' },
  { id:'plica_coscia',   label:'Plica Coscia',   unit:'mm',step:'0.5',group:'pliche',icon:'🤏' },
  { id:'plica_sottoscapolare',label:'Sottoscapolare',unit:'mm',step:'0.5',group:'pliche',icon:'🤏' },
  { id:'plica_soprailiaca',label:'Soprailiaca',  unit:'mm',step:'0.5',group:'pliche',icon:'🤏' },
  // Esami biochimici
  { id:'glicemia',  label:'Glicemia',       unit:'mg/dL',step:'0.1',group:'esami',  icon:'🩸' },
  { id:'colest_tot',label:'Colesterolo TOT', unit:'mg/dL',step:'1', group:'esami',  icon:'🩸' },
  { id:'colest_ldl',label:'LDL',            unit:'mg/dL',step:'1', group:'esami',  icon:'🩸' },
  { id:'colest_hdl',label:'HDL',            unit:'mg/dL',step:'1', group:'esami',  icon:'🩸' },
  { id:'trigliceridi',label:'Trigliceridi', unit:'mg/dL',step:'1', group:'esami',  icon:'🩸' },
  { id:'insulina',  label:'Insulina',       unit:'μU/mL',step:'0.1',group:'esami', icon:'🩸' },
  { id:'hba1c',     label:'HbA1c',          unit:'%',    step:'0.1',group:'esami', icon:'🩸' },
  { id:'proteine_tot',label:'Proteine TOT', unit:'g/dL', step:'0.1',group:'esami', icon:'🩸' },
  { id:'albumina',  label:'Albumina',       unit:'g/dL', step:'0.1',group:'esami', icon:'🩸' },
  { id:'vit_d',     label:'Vitamina D',     unit:'ng/mL',step:'0.1',group:'esami', icon:'🩸' },
  { id:'ferro',     label:'Ferro',          unit:'μg/dL',step:'1', group:'esami',  icon:'🩸' },
  { id:'tsh',       label:'TSH',            unit:'mUI/L',step:'0.01',group:'esami',icon:'🩸' },
  // Note cliniche
  { id:'pressione', label:'Pressione',      unit:'mmHg', step:'',  group:'clinica', icon:'💓' },
  { id:'note_cliniche',label:'Note cliniche',unit:'',   step:'',   group:'clinica', icon:'📝', textarea:true },
  { id:'obiettivo_attuale',label:'Obiettivo aggiornato',unit:'',step:'',group:'clinica',icon:'🎯',textarea:true },
];

var MON_GROUPS = {
  base:    { label:'Biometria di base',       icon:'⚖️' },
  comp:    { label:'Composizione corporea',   icon:'🔬' },
  circ:    { label:'Circonferenze',           icon:'📐' },
  pliche:  { label:'Plicometria',             icon:'🤏' },
  esami:   { label:'Esami biochimici',        icon:'🩸' },
  clinica: { label:'Note cliniche',           icon:'📝' },
};

// Calcola valori derivati automaticamente
function computeMonFields(data) {
  var d = Object.assign({}, data);
  var peso = parseFloat(d.peso)||0;
  var alt  = parseFloat(d.altezza)||0;
  var fm   = parseFloat(d.fm_perc)||0;
  var mm   = parseFloat(d.mm_kg)||0;
  var vita = parseFloat(d.vita)||0;
  var fianchi = parseFloat(d.fianchi)||0;
  var acqua = parseFloat(d.acqua_perc)||0;

  if(peso>0 && alt>0)  d.bmi    = r(peso / Math.pow(alt/100, 2), 1);
  if(peso>0 && fm>0)   d.fm_kg  = r(peso * fm/100, 1);
  if(fm>0)             d.ffm_perc = r(100 - fm, 1);
  if(peso>0 && fm>0)   d.ffm_kg = r(peso * (100-fm)/100, 1);
  if(peso>0 && mm>0)   d.mm_perc = r(mm/peso*100, 1);
  if(peso>0 && acqua>0) d.acqua_kg = r(peso * acqua/100, 1);
  if(vita>0 && fianchi>0) d.whr = r(vita/fianchi, 2);
  return d;
}

// ── LOAD / SAVE misurazioni da Firestore ──────────────────────────────────────
async function loadMisurazioni(patId) {
  try {
    var snap = await db.collection('misurazioni').where('patId','==',patId).orderBy('data','desc').get();
    return snap.docs.map(function(d){ return Object.assign({id:d.id}, d.data()); });
  } catch(e) {
    // Se orderBy fallisce per indice mancante, prova senza
    try {
      var snap2 = await db.collection('misurazioni').where('patId','==',patId).get();
      var docs = snap2.docs.map(function(d){ return Object.assign({id:d.id}, d.data()); });
      docs.sort(function(a,b){ return (b.data||'').localeCompare(a.data||''); });
      return docs;
    } catch(e2){ console.error('loadMisurazioni:', e2); return []; }
  }
}

async function saveMisurazione(patId, nutriId, data) {
  var docId = data.id || ('m-'+uid());
  var toSave = Object.assign({}, data, { patId:patId, nutriId:nutriId, updatedAt:new Date().toISOString() });
  delete toSave.id;
  await db.collection('misurazioni').doc(docId).set(toSave, {merge:true});
  return docId;
}

async function deleteMisurazione(docId) {
  await db.collection('misurazioni').doc(docId).delete();
}

// ── RENDER MONITORAGGIO ───────────────────────────────────────────────────────
async function renderMonitoraggio() {
  var pat = getPatientById(S.patientId);
  if(!pat){ setHtml('tab-monitoraggio','<div class="empty-state"><div class="empty-state-title">Nessun paziente selezionato</div></div>'); return; }

  setHtml('tab-monitoraggio','<div style="text-align:center;padding:30px;color:var(--text-sec)">⏳ Caricamento misurazioni...</div>');
  var misurazioni = await loadMisurazioni(pat.id);

  var html = '';

  // ── PULSANTE NUOVA MISURAZIONE ──
  html += '<button class="btn-full btn-prim purple" onclick="openNuovaMisurazione()" style="margin-bottom:12px">＋ Nuova misurazione</button>';

  // ── STATISTICHE & CONFRONTO ──
  if(misurazioni.length >= 2) {
    html += buildMonStats(misurazioni, pat);
  }

  // ── GRAFICO TREND PESO ──
  if(misurazioni.length >= 2) {
    html += buildMonChart(misurazioni);
  }

  // ── STORICO ──
  html += '<div class="sec-title">Storico misurazioni ('+misurazioni.length+')</div>';

  if(!misurazioni.length) {
    html += '<div class="card"><div style="text-align:center;color:var(--text-sec);padding:20px">'
      +'<div style="font-size:32px;margin-bottom:8px">📏</div>'
      +'<div style="font-weight:700">Nessuna misurazione ancora</div>'
      +'<div style="font-size:13px;margin-top:4px">Aggiungi la prima misurazione per iniziare il monitoraggio</div>'
      +'</div></div>';
  } else {
    misurazioni.forEach(function(m, idx) {
      var prev = misurazioni[idx+1];
      html += buildMisurazioneCard(m, prev, pat.obiettivi);
    });
  }

  setHtml('tab-monitoraggio', html);
}

// ── CARD SINGOLA MISURAZIONE ──────────────────────────────────────────────────
function buildMisurazioneCard(m, prev, obiettivi) {
  var computed = computeMonFields(m);
  var dateStr = m.data ? new Date(m.data).toLocaleDateString('it-IT',{day:'2-digit',month:'short',year:'numeric'}) : '—';

  var html = '<div class="card" style="margin-bottom:10px">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">'
    +'<div><div style="font-size:14px;font-weight:800;color:var(--text)">📅 '+dateStr+'</div>'
    +(m.tipo_visita?'<div style="font-size:12px;color:var(--text-sec)">'+m.tipo_visita+'</div>':'')
    +'</div>'
    +'<div style="display:flex;gap:6px">'
    +'<button class="btn-sm btn-sm-blue" onclick="openEditMisurazione(\''+m.id+'\')">✏️</button>'
    +'<button class="btn-sm btn-sm-red" onclick="confermaCancellaMisurazione(\''+m.id+'\')">🗑️</button>'
    +'</div></div>';

  // KPI principali
  var kpis = [
    {k:'peso',label:'Peso',unit:'kg'},
    {k:'bmi',label:'BMI',unit:''},
    {k:'fm_perc',label:'%FM',unit:'%'},
    {k:'ffm_kg',label:'FFM',unit:'kg'},
    {k:'mm_kg',label:'Musc.',unit:'kg'},
    {k:'acqua_perc',label:'%H₂O',unit:'%'},
  ];

  html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px">';
  kpis.forEach(function(kpi) {
    var val = computed[kpi.k];
    if(val===undefined||val===''||val===null) return;
    var delta = '';
    if(prev) {
      var prevComp = computeMonFields(prev);
      var prevVal = prevComp[kpi.k];
      if(prevVal!==undefined && prevVal!=='' && prevVal!==null) {
        var diff = r(parseFloat(val) - parseFloat(prevVal), 1);
        var color = diff < 0 ? '#1D9E75' : (diff > 0 ? '#E24B4A' : '#6b7280');
        // Per FM% diminuire è buono, per FFM aumentare è buono
        if(kpi.k==='ffm_kg'||kpi.k==='mm_kg'||kpi.k==='acqua_perc') color = diff > 0 ? '#1D9E75' : (diff < 0 ? '#E24B4A' : '#6b7280');
        if(diff!==0) delta = '<div style="font-size:10px;color:'+color+';font-weight:700">'+(diff>0?'+':'')+diff+(kpi.unit?kpi.unit:'')+'</div>';
      }
    }
    html += '<div style="background:var(--bg-sec);border-radius:var(--rs);padding:8px;text-align:center">'
      +'<div style="font-size:17px;font-weight:800;color:var(--text)">'+val+(kpi.unit&&kpi.k!=='bmi'?'':'')+'</div>'
      +'<div style="font-size:10px;color:var(--text-sec)">'+kpi.label+(kpi.unit?' ('+kpi.unit+')':'')+' </div>'
      +delta
      +'</div>';
  });
  html += '</div>';

  // Circonferenze se presenti
  var circs = ['vita','fianchi','torace','braccio_dx','coscia_dx'];
  var hasCirc = circs.some(function(c){ return m[c]; });
  if(hasCirc) {
    html += '<div style="font-size:11px;font-weight:700;color:var(--text-sec);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Circonferenze</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px">';
    circs.forEach(function(c) {
      if(!m[c]) return;
      var cf = MON_FIELDS.find(function(f){ return f.id===c; });
      html += '<span style="font-size:12px;background:var(--blue-l);color:var(--blue-d);padding:3px 8px;border-radius:20px;font-weight:600">'
        +(cf?cf.label:c)+': '+m[c]+' cm</span>';
    });
    html += '</div>';
  }

  // Note cliniche
  if(m.note_cliniche) {
    html += '<div class="note-box"><div class="note-text">📝 '+m.note_cliniche+'</div></div>';
  }
  if(m.obiettivo_attuale) {
    html += '<div style="background:var(--green-l);border-left:3px solid var(--green);padding:7px 10px;border-radius:0 var(--rs) var(--rs) 0;font-size:12px;color:var(--green-d)">🎯 '+m.obiettivo_attuale+'</div>';
  }

  html += '</div>';
  return html;
}

// ── STATISTICHE ───────────────────────────────────────────────────────────────
function buildMonStats(misurazioni, pat) {
  var ultima = computeMonFields(misurazioni[0]);
  var prima  = computeMonFields(misurazioni[misurazioni.length-1]);

  // Confronto con misurazione del mese scorso
  var now = new Date();
  var unMeseFa = new Date(now.getFullYear(), now.getMonth()-1, now.getDate());
  var mesePrev = null;
  for(var i=1; i<misurazioni.length; i++){
    if(misurazioni[i].data && new Date(misurazioni[i].data) <= unMeseFa) {
      mesePrev = computeMonFields(misurazioni[i]); break;
    }
  }

  var html = '<div class="sec-title">📊 Riepilogo & confronto</div>';

  // Card variazione totale
  html += '<div class="card" style="margin-bottom:10px">';
  html += '<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:10px">Variazione totale ('+misurazioni.length+' misurazioni)</div>';

  var metrics = [
    {k:'peso',label:'Peso',unit:'kg',lessIsBetter:true},
    {k:'fm_perc',label:'% Massa Grassa',unit:'%',lessIsBetter:true},
    {k:'ffm_kg',label:'Massa Magra',unit:'kg',lessIsBetter:false},
    {k:'mm_kg',label:'Massa Muscolare',unit:'kg',lessIsBetter:false},
    {k:'vita',label:'Vita',unit:'cm',lessIsBetter:true},
    {k:'acqua_perc',label:'% Acqua',unit:'%',lessIsBetter:false},
  ];

  html += '<div style="display:flex;flex-direction:column;gap:6px">';
  metrics.forEach(function(m2) {
    var v1 = parseFloat(prima[m2.k]); var v2 = parseFloat(ultima[m2.k]);
    if(isNaN(v1)||isNaN(v2)||v1===v2) return;
    var diff = r(v2-v1, 1);
    var isGood = m2.lessIsBetter ? diff<0 : diff>0;
    var color = diff===0 ? '#6b7280' : (isGood ? '#1D9E75' : '#E24B4A');
    var arrow = diff<0 ? '↓' : (diff>0 ? '↑' : '→');
    html += '<div style="display:flex;align-items:center;gap:8px">'
      +'<span style="font-size:12px;color:var(--text-sec);flex:1">'+m2.label+'</span>'
      +'<span style="font-size:13px;font-weight:600;color:var(--text)">'+v1+' → '+v2+' '+m2.unit+'</span>'
      +'<span style="font-size:13px;font-weight:800;color:'+color+'">'+arrow+' '+(diff>0?'+':'')+diff+' '+m2.unit+'</span>'
      +'</div>';
  });
  html += '</div></div>';

  // Confronto mese precedente
  if(mesePrev) {
    html += '<div class="card" style="margin-bottom:10px">';
    html += '<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:10px">Variazione ultimo mese</div>';
    html += '<div style="display:flex;flex-direction:column;gap:6px">';
    metrics.forEach(function(m2) {
      var v1 = parseFloat(mesePrev[m2.k]); var v2 = parseFloat(ultima[m2.k]);
      if(isNaN(v1)||isNaN(v2)) return;
      var diff = r(v2-v1, 1);
      var isGood = m2.lessIsBetter ? diff<0 : diff>0;
      var color = diff===0 ? '#6b7280' : (isGood ? '#1D9E75' : '#E24B4A');
      var arrow = diff<0 ? '↓' : (diff>0 ? '↑' : '→');
      html += '<div style="display:flex;align-items:center;gap:8px">'
        +'<span style="font-size:12px;color:var(--text-sec);flex:1">'+m2.label+'</span>'
        +'<span style="font-size:13px;font-weight:600;color:var(--text)">'+v1+' → '+v2+' '+m2.unit+'</span>'
        +'<span style="font-size:13px;font-weight:800;color:'+color+'">'+arrow+' '+(diff>0?'+':'')+diff+' '+m2.unit+'</span>'
        +'</div>';
    });
    html += '</div></div>';
  }

  // Statistica descrittiva sul peso
  var pesi = misurazioni.map(function(m){ return parseFloat(m.peso); }).filter(function(v){ return !isNaN(v); });
  if(pesi.length>=3) {
    var pMin=Math.min.apply(null,pesi), pMax=Math.max.apply(null,pesi);
    var pMean=r(pesi.reduce(function(s,v){return s+v;},0)/pesi.length, 1);
    var pVar=pesi.reduce(function(s,v){return s+Math.pow(v-pMean,2);},0)/pesi.length;
    var pSD=r(Math.sqrt(pVar), 1);
    html += '<div class="card" style="margin-bottom:10px">'
      +'<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:10px">Statistica peso ('+pesi.length+' misurazioni)</div>'
      +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">'
      +'<div style="text-align:center;background:var(--bg-sec);border-radius:var(--rs);padding:8px"><div style="font-size:16px;font-weight:800">'+pMin+'</div><div style="font-size:10px;color:var(--text-sec)">Min kg</div></div>'
      +'<div style="text-align:center;background:var(--bg-sec);border-radius:var(--rs);padding:8px"><div style="font-size:16px;font-weight:800">'+pMax+'</div><div style="font-size:10px;color:var(--text-sec)">Max kg</div></div>'
      +'<div style="text-align:center;background:var(--bg-sec);border-radius:var(--rs);padding:8px"><div style="font-size:16px;font-weight:800">'+pMean+'</div><div style="font-size:10px;color:var(--text-sec)">Media kg</div></div>'
      +'<div style="text-align:center;background:var(--bg-sec);border-radius:var(--rs);padding:8px"><div style="font-size:16px;font-weight:800">'+pSD+'</div><div style="font-size:10px;color:var(--text-sec)">Dev.Std kg</div></div>'
      +'</div></div>';
  }

  return html;
}

// ── GRAFICO TREND ─────────────────────────────────────────────────────────────
function buildMonChart(misurazioni) {
  var pesi = misurazioni.slice().reverse().filter(function(m){ return m.peso; });
  if(pesi.length < 2) return '';

  var vals = pesi.map(function(m){ return parseFloat(m.peso); });
  var minV = Math.min.apply(null,vals) - 1;
  var maxV = Math.max.apply(null,vals) + 1;
  var range = maxV - minV || 1;
  var W = 340, H = 100, pad = 28;
  var pts = vals.map(function(v,i){
    return { x: pad + i*(W-pad*2)/(vals.length-1), y: H - pad - (v-minV)/range*(H-pad*2) };
  });

  var path = pts.map(function(p,i){ return (i===0?'M':'L')+r(p.x)+','+r(p.y); }).join(' ');
  var areaPath = 'M'+r(pts[0].x)+','+H+' '+pts.map(function(p){ return 'L'+r(p.x)+','+r(p.y); }).join(' ')+' L'+r(pts[pts.length-1].x)+','+H+' Z';

  var labels = pesi.map(function(m){ return m.data ? new Date(m.data).toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit'}) : ''; });

  var svg = '<svg viewBox="0 0 '+W+' '+(H+16)+'" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">'
    // Grid lines
    +'<line x1="'+pad+'" y1="'+pad+'" x2="'+pad+'" y2="'+(H-pad)+'" stroke="#e0e0e0" stroke-width="1"/>'
    +'<line x1="'+pad+'" y1="'+(H-pad)+'" x2="'+(W-pad)+'" y2="'+(H-pad)+'" stroke="#e0e0e0" stroke-width="1"/>'
    // Area
    +'<path d="'+areaPath+'" fill="#378ADD" fill-opacity="0.12"/>'
    // Line
    +'<path d="'+path+'" fill="none" stroke="#378ADD" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'
    // Points
    +pts.map(function(p,i){
      return '<circle cx="'+r(p.x)+'" cy="'+r(p.y)+'" r="3.5" fill="white" stroke="#378ADD" stroke-width="2"/>'
        +'<text x="'+r(p.x)+'" y="'+(r(p.y)-7)+'" text-anchor="middle" font-size="9" fill="#378ADD" font-weight="700">'+vals[i]+'</text>';
    }).join('')
    // X labels
    +labels.filter(function(_,i){ return i%Math.ceil(labels.length/5)===0||i===labels.length-1; }).map(function(lbl,_,arr){
      var origIdx = labels.indexOf(lbl);
      return '<text x="'+r(pts[origIdx].x)+'" y="'+(H+13)+'" text-anchor="middle" font-size="8.5" fill="#9ca3af">'+lbl+'</text>';
    }).join('')
    // Y labels
    +'<text x="'+(pad-3)+'" y="'+(pad+3)+'" text-anchor="end" font-size="8.5" fill="#9ca3af">'+r(maxV,0)+'</text>'
    +'<text x="'+(pad-3)+'" y="'+(H-pad+3)+'" text-anchor="end" font-size="8.5" fill="#9ca3af">'+r(minV,0)+'</text>'
    +'</svg>';

  return '<div class="sec-title">📈 Andamento peso</div>'
    +'<div class="card" style="margin-bottom:10px;padding:12px 8px 6px">'+svg+'</div>';
}

// ── MODAL NUOVA / MODIFICA MISURAZIONE ───────────────────────────────────────
var _monMisurazioni = [];

async function openNuovaMisurazione(){
  MON.editingId = null;
  _monMisurazioni = await loadMisurazioni(S.patientId);
  showMonModal({});
}

async function openEditMisurazione(docId){
  MON.editingId = docId;
  _monMisurazioni = await loadMisurazioni(S.patientId);
  var existing = _monMisurazioni.find(function(m){ return m.id===docId; })||{};
  showMonModal(existing);
}

function showMonModal(data){
  var content = el('modalMonContent');
  content.innerHTML = '';

  var handle = document.createElement('div'); handle.className='modal-handle'; content.appendChild(handle);
  var title = document.createElement('div'); title.className='modal-title';
  title.textContent = MON.editingId ? 'Modifica misurazione' : 'Nuova misurazione';
  content.appendChild(title);

  // Data e tipo visita
  var today = new Date().toISOString().split('T')[0];
  var dateRow = document.createElement('div'); dateRow.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px';

  var lDate=document.createElement('div');
  lDate.innerHTML='<label class="lbl">Data visita</label><input type="date" class="inp" id="monData" value="'+(data.data||today)+'" style="margin-bottom:0">';
  var lTipo=document.createElement('div');
  lTipo.innerHTML='<label class="lbl">Tipo visita</label><select class="inp" id="monTipo" style="margin-bottom:0">'
    +['Prima visita','Controllo mensile','Controllo bimestrale','Controllo trimestrale','Visita urgente','Altro'].map(function(t){
      return '<option value="'+t+'"'+(data.tipo_visita===t?' selected':'')+'>'+t+'</option>';
    }).join('')+'</select>';
  dateRow.appendChild(lDate); dateRow.appendChild(lTipo);
  content.appendChild(dateRow);

  // Gruppi di campi
  Object.keys(MON_GROUPS).forEach(function(gKey){
    var group = MON_GROUPS[gKey];
    var fields = MON_FIELDS.filter(function(f){ return f.group===gKey && !f.computed; });
    if(!fields.length) return;

    var secDiv = document.createElement('div');
    secDiv.innerHTML = '<div class="sec-title" style="margin-top:10px">'+group.icon+' '+group.label+'</div>';
    content.appendChild(secDiv);

    var grid = document.createElement('div');
    grid.style.cssText = gKey==='clinica' ? '' : 'display:grid;grid-template-columns:1fr 1fr;gap:8px';

    fields.forEach(function(f){
      var wrapper = document.createElement('div');
      if(f.textarea){
        wrapper.style.gridColumn = '1/-1';
        wrapper.innerHTML = '<label class="lbl">'+f.icon+' '+f.label+'</label>'
          +'<textarea class="textarea-inp" id="mon_'+f.id+'" style="min-height:60px;margin-bottom:4px" placeholder="'+f.label+'">'+(data[f.id]||'')+'</textarea>';
      } else {
        wrapper.innerHTML = '<label class="lbl">'+f.icon+' '+f.label+(f.unit?' ('+f.unit+')':'')+'</label>'
          +'<input type="number" class="inp" id="mon_'+f.id+'" value="'+(data[f.id]||'')+'" step="'+f.step+'" placeholder="—" style="margin-bottom:0">';
      }
      grid.appendChild(wrapper);
    });
    content.appendChild(grid);
  });

  // Pulsanti
  var btnDiv = document.createElement('div'); btnDiv.style.marginTop='16px';
  var btnSave = document.createElement('button'); btnSave.className='btn-full btn-prim'; btnSave.textContent='💾 Salva misurazione';
  btnSave.onclick = saveMisurazioneFromModal;
  var btnCancel = document.createElement('button'); btnCancel.className='btn-full btn-sec'; btnCancel.textContent='Annulla';
  btnCancel.onclick = function(){ closeModal('modalMon'); };
  btnDiv.appendChild(btnSave); btnDiv.appendChild(btnCancel);
  content.appendChild(btnDiv);

  openModal('modalMon');
}

async function saveMisurazioneFromModal(){
  var data = { data: el('monData').value, tipo_visita: el('monTipo').value };
  MON_FIELDS.filter(function(f){ return !f.computed; }).forEach(function(f){
    var inp = el('mon_'+f.id);
    if(inp && inp.value!=='') data[f.id] = f.textarea ? inp.value : parseFloat(inp.value)||inp.value;
  });
  if(!data.data){ showToast('⚠️ Inserisci la data'); return; }

  if(MON.editingId) data.id = MON.editingId;
  try {
    await saveMisurazione(S.patientId, S.nutriId, data);
    closeModal('modalMon');
    showToast('✅ Misurazione salvata!');
    renderMonitoraggio();
  } catch(e){ showToast('❌ Errore: '+e.message, 4000); }
}

async function confermaCancellaMisurazione(docId){
  if(!confirm('Eliminare questa misurazione?')) return;
  try {
    await deleteMisurazione(docId);
    showToast('🗑️ Eliminata');
    renderMonitoraggio();
  } catch(e){ showToast('❌ Errore: '+e.message); }
}


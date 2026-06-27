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
function getSession(){try{return JSON.parse(sessionStorage.getItem(K_SESSION)||'null');}catch(e){return null;}}
function saveSession(s){sessionStorage.setItem(K_SESSION,JSON.stringify(s));}
function clearSession(){sessionStorage.removeItem(K_SESSION);}

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
function getDietaForWeek(patient, weekOffset){
  // weekOffset: 0=current week, 1=next, -1=prev etc.
  var cfg=patient.configAB||{};
  if(!cfg.enabled) return patient.dieta||{giorni:{}};
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
      saveSession({role:'nutrizionista',nutriId:acc.id});
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
    +'<div class="tab" onclick="switchTab(\'settimana\',1);setNav(1)">📆 Settimana</div>'
    +'<div class="tab" onclick="switchTab(\'nutrienti\',2);setNav(2)">📊 Nutrienti</div>'
    +'<div class="tab" onclick="switchTab(\'configAB\',3);setNav(3)">🔄 Dieta A/B</div>'
    +'<div class="tab" onclick="backToPazienti()">← Pazienti</div>';
  el('bottomNav').innerHTML='<div class="nav-item active purple-nav" id="nav0" onclick="switchTab(\'oggi\',0);setNav(0)"><span class="nav-icon">📅</span><span class="nav-lbl">Dieta</span></div>'
    +'<div class="nav-item" id="nav1" onclick="switchTab(\'settimana\',1);setNav(1)"><span class="nav-icon">📆</span><span class="nav-lbl">Settimana</span></div>'
    +'<div class="nav-item" id="nav2" onclick="switchTab(\'nutrienti\',2);setNav(2)"><span class="nav-icon">📊</span><span class="nav-lbl">Nutrienti</span></div>'
    +'<div class="nav-item" id="nav3" onclick="switchTab(\'configAB\',3);setNav(3)"><span class="nav-icon">🔄</span><span class="nav-lbl">A/B</span></div>'
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
  var start=cfg.startDate?new Date(cfg.startDate):new Date();
  var now=new Date();
  var baseW=Math.floor((now-start)/(7*24*60*60*1000));
  var targetW=baseW+S.weekOffset;
  var key=targetW%2===0?'A':'B';
  return ' — Dieta '+key;
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
        +'<button class="btn-sm" style="background:#E6F1FB;color:#0C447C" onclick="printDieta(\''+pat.id+'\')">🖨️ Stampa</button>'
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
function renderImpostazioni(){
  var accounts=[];var acc=null;
  var html='<div class="sec-title">Il mio account</div>'
    +'<div class="card"><div class="card-title">🩺 Nutrizionista</div>'
    +'<div style="font-size:13px;color:var(--text-sec);margin-top:4px">Pazienti: '+getPatientsOf(S.nutriId).length+'</div></div>'
    +'<div class="sec-title">Dati</div>'
    +'<div class="card"><div class="card-title">⚠️ Cancella tutti i dati</div>'
    +'<div class="card-desc">Cancella permanentemente tutti i pazienti e le diete associate al tuo account.</div>'
    +'<button class="btn-act btn-rst" onclick="deleteAllData()">🗑️ Cancella tutti i dati</button></div>';
  setHtml('tab-impostazioni',html);
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

// ── STAMPA // ── STAMPA ────────────────────────────────────────────────────────────────────
function printDieta(patId){
  var pat=getPatientById(patId);if(!pat){showToast('⚠️ Paziente non trovato');return;}
  var giorni=(pat.dieta&&pat.dieta.giorni)||{};
  var obj=pat.obiettivi||{kcal:1800,p:120,c:200,f:60};
  var now=new Date();
  var dateStr=now.getDate()+' '+MM[now.getMonth()]+' '+now.getFullYear();
  var GG_FULL=['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
  var PASTI_P=[{id:'colazione',nome:'Colazione',emoji:'☕'},{id:'spuntino_m',nome:'Spuntino',emoji:'🍎'},{id:'pranzo',nome:'Pranzo',emoji:'🍽️'},{id:'merenda',nome:'Merenda',emoji:'🥜'},{id:'cena',nome:'Cena',emoji:'🌙'}];
  var html='<div class="print-page"><div class="print-header"><h1>🥗 Piano Alimentare Settimanale</h1>'
    +'<p><strong>'+pat.nome+'</strong> &nbsp;·&nbsp; Stampato il '+dateStr+'</p>'
    +'<p>Obiettivi: '+obj.kcal+' kcal &nbsp;|&nbsp; P '+obj.p+'g &nbsp;|&nbsp; C '+obj.c+'g &nbsp;|&nbsp; G '+obj.f+'g</p></div>';
  for(var i=0;i<7;i++){
    var g=giorni[i]||{};var note=g.note||{};var tot=getTotals(pat,i);var d=getDate(i);
    html+='<div class="print-day"><div class="print-day-title">'+GG_FULL[i]+' '+d.getDate()+' '+MM[d.getMonth()]+'</div>';
    PASTI_P.forEach(function(pm){
      var cibi=g[pm.id]||[];if(!cibi.length)return;
      var pk=r(cibi.reduce(function(s,f){return s+(f.kcal||0);},0));
      var pp=r(cibi.reduce(function(s,f){return s+(f.p||0);},0),1);
      var pc=r(cibi.reduce(function(s,f){return s+(f.c||0);},0),1);
      var pf=r(cibi.reduce(function(s,f){return s+(f.fat||f.f||0);},0),1);
      html+='<div class="print-pasto"><div class="print-pasto-title">'+pm.emoji+' '+pm.nome+'</div>';
      cibi.forEach(function(food){
        html+='<div class="print-food"><span class="print-food-name">'+food.n+'</span><span class="print-food-qty">'+(food.q||'')+'</span><span class="print-food-kcal">'+r(food.kcal||0)+' kcal</span></div>';
      });
      html+='<div class="print-macros">P '+pp+'g &nbsp;·&nbsp; C '+pc+'g &nbsp;·&nbsp; G '+pf+'g &nbsp;·&nbsp; Tot. '+pk+' kcal</div>';
      if(note[pm.id])html+='<div class="print-nota">📝 '+note[pm.id]+'</div>';
      html+='</div>';
    });
    html+='<div class="print-day-totals">Totale giorno: '+tot.kcal+' kcal &nbsp;|&nbsp; P '+tot.p+'g &nbsp;|&nbsp; C '+tot.c+'g &nbsp;|&nbsp; G '+tot.f+'g</div></div>';
    if(i===1||i===3||i===5)html+='<div style="page-break-after:always"></div>';
  }
  html+='<div class="print-page"><div class="print-header"><h1>📊 Riepilogo Settimanale</h1><p>'+pat.nome+'</p></div><div class="print-week-summary">';
  for(var j=0;j<7;j++){
    var tot2=getTotals(pat,j);var pct=Math.min(100,r(tot2.kcal/obj.kcal*100));
    html+='<div class="print-week-row"><span class="print-week-day">'+GG_FULL[j].slice(0,3)+'</span><span class="print-week-kcal">'+tot2.kcal+' kcal</span><div class="print-week-bar"><div class="print-week-fill" style="width:'+pct+'%"></div></div><span style="font-size:11px;color:#6b7280;width:35px;text-align:right">'+pct+'%</span></div>';
  }
  var avgK=r(Object.keys(giorni).reduce(function(s,k){return s+getTotals(pat,parseInt(k)).kcal;},0)/7);
  html+='</div><div style="margin-top:16px;padding:10px;background:#E6F1FB;border-radius:8px;font-size:12px"><strong>Media settimanale:</strong> '+avgK+' kcal/giorno &nbsp;·&nbsp; Obiettivo: '+obj.kcal+' kcal/giorno</div></div></div>';
  el('print-area').innerHTML=html;
  setTimeout(function(){window.print();setTimeout(function(){el('print-area').innerHTML='';},1000);},150);
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

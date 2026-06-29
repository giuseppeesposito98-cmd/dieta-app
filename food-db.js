// DATABASE ALIMENTI — Valori per 100g
// Fonte: etichette nutrizionali ufficiali dei produttori + CREA (ex INRAN)
// Struttura: [nome, kcal, proteine, carboidrati, grassi, fibra, categoria]
const FOOD_DB = [

// ═══════════════════════════════════════════════════════
// CEREALI & COLAZIONE — Prodotti di marca
// ═══════════════════════════════════════════════════════
["Kellogg's Corn Flakes",372,7,84,0.9,3,"Cereali & Pane"],
["Kellogg's Special K Classic",370,16,70,1.5,3.5,"Cereali & Pane"],
["Kellogg's Special K Frutti Rossi",372,15,72,1.5,3.5,"Cereali & Pane"],
["Kellogg's Special K Cioccolato",382,14,71,3.5,3,"Cereali & Pane"],
["Kellogg's Frosties",378,3.5,87,0.4,0.9,"Cereali & Pane"],
["Kellogg's Crunchy Nut",396,7,83,3.5,2,"Cereali & Pane"],
["Kellogg's All-Bran",270,14,46,3,27,"Cereali & Pane"],
["Kellogg's Fruit'n Fibre",356,8,72,3.5,8,"Cereali & Pane"],
["Kellogg's Muesli",361,8,65,5,7,"Cereali & Pane"],
["Kellogg's Rice Krispies",383,7,87,0.8,1.1,"Cereali & Pane"],
["Kellogg's Tresor Cioccolato",487,6.5,71,19,2.5,"Cereali & Pane"],
["Kellogg's Extra Granola Frutti Rossi",430,8,65,15,5,"Cereali & Pane"],
["Kellogg's Granola Cioccolato",445,8,65,16,5,"Cereali & Pane"],
["Nestlé Fitness Classico",367,10,73,2.5,5,"Cereali & Pane"],
["Nestlé Fitness Cioccolato",381,9,73,4,4.5,"Cereali & Pane"],
["Nestlé Fitness Frutti Rossi",368,9,74,2.5,4.5,"Cereali & Pane"],
["Nestlé Cheerios",373,10,74,3.5,5,"Cereali & Pane"],
["Nestlé Nesquik Cereali",388,6,83,3,3,"Cereali & Pane"],
["Nestlé Lion Cereali",472,6.5,73,18,2,"Cereali & Pane"],
["Nestlé Chocapic",383,7.5,76,4.5,5,"Cereali & Pane"],
["Nestlé Cini Minis",387,6,80,5,3,"Cereali & Pane"],
["Nestlé Cookie Crisp",391,6,82,5,2.5,"Cereali & Pane"],
["Quaker Fiocchi d'Avena",367,13,61,7,9,"Cereali & Pane"],
["Quaker Oat So Simple",356,11,62,7,8,"Cereali & Pane"],
["Quaker Granola Miele Noci",436,9,62,16,6,"Cereali & Pane"],
["Dr. Schär Cornflakes senza glutine",375,6,86,1,2,"Cereali & Pane"],
["Alpen Muesli Originale",366,10,67,6,8,"Cereali & Pane"],
["Jordans Country Crisp Frutti Rossi",459,8,62,19,5,"Cereali & Pane"],
["Weetabix",338,12,68,2,10,"Cereali & Pane"],
["Vitalis Muesli Frutti",350,9,64,6,7,"Cereali & Pane"],

// ═══════════════════════════════════════════════════════
// YOGURT — Prodotti di marca
// ═══════════════════════════════════════════════════════
["Fage Total 0%",57,10.3,4,0.2,0,"Yogurt"],
["Fage Total 2%",73,9.9,3.9,2,0,"Yogurt"],
["Fage Total 5%",97,9.3,3.8,5,0,"Yogurt"],
["Fage Total 0% Fragola",90,8,13,0.2,0,"Yogurt"],
["Fage Total 0% Mango",90,8,13,0.2,0,"Yogurt"],
["Fage Total 0% Miele",110,9,17,0.2,0,"Yogurt"],
["Fage Crossover Fragola",135,6,19,4,0,"Yogurt"],
["Müller Corner Fragola",111,3.9,18,2.5,0.3,"Yogurt"],
["Müller Corner Ciliegia",114,3.8,19,2.5,0.3,"Yogurt"],
["Müller Corner Mango",110,3.9,18,2.4,0.3,"Yogurt"],
["Müller Corner Cioccolato",130,4.5,20,3.5,0.5,"Yogurt"],
["Müller Light Fragola",50,5.3,6.4,0.2,0,"Yogurt"],
["Müller Light Vaniglia",50,5.1,6.5,0.2,0,"Yogurt"],
["Müller Rice Cioccolato",128,2.9,22,3,0.3,"Yogurt"],
["Danone Activia Naturale",66,4.8,7.6,2,0,"Yogurt"],
["Danone Activia Fragola",80,3.8,14,1.4,0.5,"Yogurt"],
["Danone Activia Mirtilli",82,3.8,14,1.5,0.5,"Yogurt"],
["Danone Activia 0% Naturale",44,4.7,6,0.1,0,"Yogurt"],
["Danone Oikos Proteico 0%",63,11,4.8,0.2,0,"Yogurt"],
["Danone Oikos Proteico Fragola",75,8.5,9,0.2,0,"Yogurt"],
["Danone Alpro Soia Naturale",56,4.4,2.8,2.8,0,"Yogurt"],
["Danone Alpro Mandorla",48,0.8,6.5,2,1,"Yogurt"],
["Danone Alpro Avena",68,3,10,1.5,1,"Yogurt"],
["Chobani Greco 0% Naturale",59,10,3.6,0.2,0,"Yogurt"],
["Yoplait Naturale Intero",62,3.9,5.2,2.9,0,"Yogurt"],
["Yoplait Fragola",96,3.5,17,1.5,0,"Yogurt"],
["Vipiteno Greco 0%",57,10,4,0.2,0,"Yogurt"],
["Vipiteno Naturale Intero",65,3.7,4.9,3.1,0,"Yogurt"],
["Vipiteno Fragola",96,3.3,16.5,2,0,"Yogurt"],
["Zymil Yogurt Senza Lattosio Naturale",63,4.1,5.5,2.9,0,"Yogurt"],
["Bontà Viva Greco 0%",58,10,4,0.2,0,"Yogurt"],
["Lidl Milbona Greco 0%",57,10,4,0.2,0,"Yogurt"],
["Lidl Milbona Naturale Intero",61,3.5,4.8,3.2,0,"Yogurt"],
["Esselunga Greco 0%",57,10,4,0.1,0,"Yogurt"],

// ═══════════════════════════════════════════════════════
// LATTE & BEVANDE VEGETALI — Prodotti di marca
// ═══════════════════════════════════════════════════════
["Alpro Latte di Soia Originale",33,3.3,0.5,1.8,0,"Latticini & Formaggi"],
["Alpro Latte di Soia Senza Zucchero",27,3.3,0.5,1.5,0,"Latticini & Formaggi"],
["Alpro Latte di Mandorla",24,0.5,3.3,1.1,0.2,"Latticini & Formaggi"],
["Alpro Latte di Avena",45,1,6.5,1,0.7,"Latticini & Formaggi"],
["Alpro Latte di Cocco",22,0.2,2.7,1,0,"Latticini & Formaggi"],
["Oatly Avena Originale",48,1,6.5,1.5,0.8,"Latticini & Formaggi"],
["Oatly Avena Barista",60,1,7.5,2.5,0.8,"Latticini & Formaggi"],
["Oatly Avena Senza Zucchero",40,1,5,1.5,0.8,"Latticini & Formaggi"],
["Riso Scotti Latte di Riso",47,0.1,9.9,1,0.3,"Latticini & Formaggi"],
["Provamel Soia Senza Zucchero",28,3.3,0.5,1.5,0,"Latticini & Formaggi"],
["Granarolo Latte Intero UHT",64,3.4,4.8,3.6,0,"Latticini & Formaggi"],
["Granarolo Latte Parzialmente Scremato",46,3.4,4.8,1.5,0,"Latticini & Formaggi"],
["Granarolo Latte Scremato",35,3.5,5,0.1,0,"Latticini & Formaggi"],
["Parmalat Latte Intero",64,3.2,4.8,3.6,0,"Latticini & Formaggi"],
["Parmalat Latte Scremato",34,3.4,4.9,0.1,0,"Latticini & Formaggi"],
["Zymil Latte Senza Lattosio Intero",64,3.4,4.8,3.6,0,"Latticini & Formaggi"],
["Zymil Latte Senza Lattosio Parz. Scremato",46,3.4,4.8,1.5,0,"Latticini & Formaggi"],
["Mimosa Latte di Soia",33,3.3,0.5,1.8,0,"Latticini & Formaggi"],

// ═══════════════════════════════════════════════════════
// PASTA — Prodotti di marca
// ═══════════════════════════════════════════════════════
["Barilla Spaghetti n.5 (cruda)",351,13,70,1.5,2.7,"Pasta & Riso"],
["Barilla Penne Rigate (cruda)",351,13,70,1.5,2.7,"Pasta & Riso"],
["Barilla Fusilli (cruda)",351,13,70,1.5,2.7,"Pasta & Riso"],
["Barilla Rigatoni (cruda)",351,13,70,1.5,2.7,"Pasta & Riso"],
["Barilla Linguine (cruda)",351,13,70,1.5,2.7,"Pasta & Riso"],
["Barilla Integrale Spaghetti (cruda)",335,13,64,2.5,7,"Pasta & Riso"],
["Barilla Integrale Penne (cruda)",335,13,64,2.5,7,"Pasta & Riso"],
["Barilla Legumi Penne Lenticchie Rosse",351,22,55,2.5,6,"Pasta & Riso"],
["Barilla Legumi Fusilli Ceci e Cereali",355,19,57,3.5,7,"Pasta & Riso"],
["Barilla Proteine+ Spaghetti",365,18,63,3,4.5,"Pasta & Riso"],
["De Cecco Spaghetti n.12 (cruda)",352,12.5,72,1.4,2.5,"Pasta & Riso"],
["De Cecco Penne Rigate (cruda)",352,12.5,72,1.4,2.5,"Pasta & Riso"],
["De Cecco Integrale (cruda)",332,13,63,2.5,9,"Pasta & Riso"],
["Garofalo Spaghetti (cruda)",350,12,72,1.3,2.5,"Pasta & Riso"],
["Rummo Spaghetti (cruda)",350,12,72,1.3,2.5,"Pasta & Riso"],
["Buitoni Pasta Fresca all'Uovo",285,11,48,3.5,2,"Pasta & Riso"],
["Buitoni Tagliatelle Fresche",292,11,51,3.8,2,"Pasta & Riso"],
["Buitoni Tortellini Ricotta Spinaci",240,11,34,6.5,2.5,"Pasta & Riso"],
["Buitoni Tortellini Prosciutto",270,13,35,8,2,"Pasta & Riso"],
["Giovanni Rana Tortellini Ricotta Spinaci",235,11,33,6.5,2.5,"Pasta & Riso"],
["Giovanni Rana Tortellini Parmigiano",268,13,34,8,2,"Pasta & Riso"],
["Giovanni Rana Tagliatelle",290,11,50,3.5,2,"Pasta & Riso"],
["Divella Spaghetti (cruda)",350,12,72,1.4,2.5,"Pasta & Riso"],
["Voiello Spaghetti (cruda)",351,13,70,1.5,2.7,"Pasta & Riso"],

// ═══════════════════════════════════════════════════════
// RISO & CEREALI CONFEZIONATI
// ═══════════════════════════════════════════════════════
["Riso Scotti Basmati",352,7.5,77,0.9,1.2,"Pasta & Riso"],
["Riso Scotti Parboiled",350,7,79,0.8,0.8,"Pasta & Riso"],
["Riso Scotti Integrale",346,7.5,71,2.5,3.5,"Pasta & Riso"],
["Riso Scotti Arborio",353,7,78,0.7,0.5,"Pasta & Riso"],
["Gallo Carnaroli",352,7,79,0.5,0.4,"Pasta & Riso"],
["Gallo Basmati",352,8,78,0.7,1,"Pasta & Riso"],
["Uncle Ben's Riso Basmati",352,8,78,0.8,1,"Pasta & Riso"],
["Uncle Ben's Riso Integrale",350,7.5,73,2.5,3,"Pasta & Riso"],
["Uncle Ben's Express Basmati (cotto)",148,3.5,31,1.5,0.5,"Pasta & Riso"],
["Uncle Ben's Express Integrale (cotto)",135,3,28,1.5,2,"Pasta & Riso"],
["Riso Scotti Express Basmati",148,3.5,31,1.5,0.5,"Pasta & Riso"],
["Knorr Riso Risotto ai Funghi",367,9,75,3,2,"Pasta & Riso"],

// ═══════════════════════════════════════════════════════
// PANE & PRODOTTI DA FORNO — Marca
// ═══════════════════════════════════════════════════════
["Harry's Pane in Cassetta Bianco",264,9,49,3,2,"Cereali & Pane"],
["Harry's Pane in Cassetta Integrale",225,9,40,3,5,"Cereali & Pane"],
["Harry's Pane in Cassetta Senza Glutine",267,3,57,4,2,"Cereali & Pane"],
["Mulino Bianco Pan Bauletto Bianco",270,9,51,3.5,2.5,"Cereali & Pane"],
["Mulino Bianco Pan Bauletto Integrale",232,9,41,3.5,5.5,"Cereali & Pane"],
["Mulino Bianco Crackers Classici",428,10,72,12,3,"Cereali & Pane"],
["Mulino Bianco Crackers Integrali",410,11,68,11,7,"Cereali & Pane"],
["Mulino Bianco Crackers Non Salati",428,10,72,12,3,"Cereali & Pane"],
["Mulino Bianco Pane degli Angeli",398,8.5,60,14,2,"Cereali & Pane"],
["Mulino Bianco Gallette Riso",385,7,84,2.5,2,"Cereali & Pane"],
["Wasa Crispbread Integrale",345,11,64,2,16,"Cereali & Pane"],
["Wasa Crispbread Sesamo",380,12,63,5,10,"Cereali & Pane"],
["Wasa Fiber",289,12,50,2,22,"Cereali & Pane"],
["Ryvita Crispbread Originale",321,9.5,65,1.8,18,"Cereali & Pane"],
["Ryvita Muesli",356,9,67,5,9,"Cereali & Pane"],
["Pane Guttiau Sardo",400,9,78,3.5,2.5,"Cereali & Pane"],
["Carasau Sardo",400,9,79,3,2.5,"Cereali & Pane"],

// ═══════════════════════════════════════════════════════
// BISCOTTI & MERENDINE — Marca
// ═══════════════════════════════════════════════════════
["Mulino Bianco Oro Saiwa",467,7.5,70,17,2,"Biscotti & Gallette"],
["Mulino Bianco Fette Biscottate",383,10.5,75,4.5,3,"Biscotti & Gallette"],
["Mulino Bianco Baiocchi",519,8,63,26,2.5,"Biscotti & Gallette"],
["Mulino Bianco Tarallucci",448,8,68,16,2,"Biscotti & Gallette"],
["Mulino Bianco Abbracci",474,7.5,67,20,2,"Biscotti & Gallette"],
["Mulino Bianco Gocciole",474,7.5,66,20,2.5,"Biscotti & Gallette"],
["Mulino Bianco Fiesta",459,6.5,62,20,1.5,"Biscotti & Gallette"],
["Mulino Bianco Girelle",371,6,68,9,1.5,"Biscotti & Gallette"],
["Mulino Bianco Pan di Stelle",481,7.5,67,21,2.5,"Biscotti & Gallette"],
["Ringo Classici",477,5.5,68,20,1.5,"Biscotti & Gallette"],
["Oreo Classici",472,5,67,21,1.5,"Biscotti & Gallette"],
["Digestive McVitie's Originale",471,7,62,20,3.5,"Biscotti & Gallette"],
["Digestive McVitie's Cioccolato",487,7,63,22,3,"Biscotti & Gallette"],
["Lotus Biscoff",480,4.7,70,20,1.6,"Biscotti & Gallette"],
["Pavesini",388,9.5,71,7.5,1.5,"Biscotti & Gallette"],
["Plasmon Biscotti Classici",415,10,72,11,2,"Biscotti & Gallette"],
["Krumiri Bistefani",460,8,67,18,2,"Biscotti & Gallette"],
["Kinder Brioss",398,8.5,50,17,1,"Biscotti & Gallette"],
["Kinder Bueno",564,9.4,55,33,1.6,"Biscotti & Gallette"],
["Kinder Cereali",469,7.8,65,19,2.3,"Biscotti & Gallette"],
["Kinder Cioccolato",552,7.1,59,31,0.5,"Biscotti & Gallette"],
["Ferrero Rocher (1 pezzo, 12.5g)",73,0.9,6.2,5,0.6,"Biscotti & Gallette"],
["Nutella",543,6.3,57.9,30.9,3.4,"Biscotti & Gallette"],
["Lindt Cioccolato Fondente 70%",546,8,33,43,10,"Biscotti & Gallette"],
["Lindt Cioccolato Fondente 85%",564,9.8,21,48,11,"Biscotti & Gallette"],
["Lindt Cioccolato al Latte",554,8,57,32,0.5,"Biscotti & Gallette"],
["Perugina Fondente",527,8,50,32,5,"Biscotti & Gallette"],
["Galbusera Fette Biscottate Integrali",370,11,66,6,8,"Biscotti & Gallette"],

// ═══════════════════════════════════════════════════════
// SALUMI & AFFETTATI — Marca
// ═══════════════════════════════════════════════════════
["Beretta Bresaola della Valtellina",151,32,0.5,2,0,"Salumi & Affettati"],
["Beretta Prosciutto Cotto Alta Qualità",110,18,1,4,0,"Salumi & Affettati"],
["Beretta Prosciutto Crudo",247,26,0,16,0,"Salumi & Affettati"],
["Beretta Mortadella Bologna IGP",299,15,1,26,0,"Salumi & Affettati"],
["Beretta Speck Alto Adige IGP",306,25,0.5,23,0,"Salumi & Affettati"],
["Fiorucci Prosciutto Cotto",108,17,1,4,0,"Salumi & Affettati"],
["Fiorucci Bresaola",150,32,0.5,2,0,"Salumi & Affettati"],
["AIA Prosciutto Cotto Leggero",99,17,0.5,3,0,"Salumi & Affettati"],
["AIA Prosciutto Cotto Classico",112,17,1,4.5,0,"Salumi & Affettati"],
["AIA Würstel di Pollo",165,12,2,12,0,"Salumi & Affettati"],
["AIA Würstel di Tacchino",155,11,2,11,0,"Salumi & Affettati"],
["Negroni Prosciutto Crudo",245,26,0,16,0,"Salumi & Affettati"],
["Negroni Salame Felino",415,22,0.5,36,0,"Salumi & Affettati"],
["Levoni Culatello di Zibello",229,28,0,13,0,"Salumi & Affettati"],
["Rigamonti Bresaola",148,31,0.5,2,0,"Salumi & Affettati"],
["Veroni Prosciutto Cotto",106,18,1,3.5,0,"Salumi & Affettati"],
["Parmacotto Prosciutto Cotto",105,18,0.5,3.5,0,"Salumi & Affettati"],
["San Daniele Prosciutto Crudo",256,28,0,16,0,"Salumi & Affettati"],
["Parma Prosciutto di Parma",248,26,0.5,16,0,"Salumi & Affettati"],
["Citterio Salame Milano",406,21,1,36,0,"Salumi & Affettati"],
["Citterio Coppa",374,20,0,33,0,"Salumi & Affettati"],

// ═══════════════════════════════════════════════════════
// FORMAGGI — Marca
// ═══════════════════════════════════════════════════════
["Galbani Mozzarella di Bufala",263,17,0.5,22,0,"Latticini & Formaggi"],
["Galbani Fior di Latte",248,18,2.2,19,0,"Latticini & Formaggi"],
["Galbani Ricotta Vaccina",140,11,4,9,0,"Latticini & Formaggi"],
["Galbani Ricotta Light",90,11,4,3,0,"Latticini & Formaggi"],
["Galbani Philadelphia classica",228,6,3,22,0,"Latticini & Formaggi"],
["Galbani Scamorza",334,25,0,26,0,"Latticini & Formaggi"],
["Galbani Taleggio DOP",284,18,0.5,23,0,"Latticini & Formaggi"],
["Galbani Bel Paese",285,17,0.5,23,0,"Latticini & Formaggi"],
["Philadelphia Classica",228,6,3,22,0,"Latticini & Formaggi"],
["Philadelphia Leggera",133,8.5,4.5,9.5,0,"Latticini & Formaggi"],
["Philadelphia Senza Lattosio",228,6,3,22,0,"Latticini & Formaggi"],
["Granarolo Parmigiano Reggiano 24m",392,33,0,29,0,"Latticini & Formaggi"],
["Grana Padano Zanetti",384,33,0,28,0,"Latticini & Formaggi"],
["Asiago DOP Fresco",340,22,0.5,28,0,"Latticini & Formaggi"],
["Asiago DOP Stagionato",378,30,0,30,0,"Latticini & Formaggi"],
["Pecorino Romano DOP",387,26,0,31,0,"Latticini & Formaggi"],
["Caseificio Pugliese Burrata",308,10,2.5,28,0,"Latticini & Formaggi"],
["Villani Provolone Dolce",356,26,0.5,28,0,"Latticini & Formaggi"],
["Tigre Emmental",400,29,0,31,0,"Latticini & Formaggi"],
["Leerdammer Originale",345,26,0.5,26,0,"Latticini & Formaggi"],
["Leerdammer Light",265,26,0.5,17,0,"Latticini & Formaggi"],
["Président Brie",319,20,0.5,27,0,"Latticini & Formaggi"],
["Président Camembert",291,20,0.5,24,0,"Latticini & Formaggi"],
["Santa Lucia Ricotta",140,11,4,9,0,"Latticini & Formaggi"],
["Santa Lucia Mascarpone",442,5.3,4.5,45,0,"Latticini & Formaggi"],

// ═══════════════════════════════════════════════════════
// UOVA — Marca
// ═══════════════════════════════════════════════════════
["Eurovo Uovo fresco M (55g)",82,6.9,0.4,5.9,0,"Uova"],
["Eurovo Uovo fresco L (65g)",98,8.1,0.4,7,0,"Uova"],
["AIA Uovo fresco M",82,6.9,0.4,5.9,0,"Uova"],
["Galline Felici Uovo bio M",82,6.9,0.4,5.9,0,"Uova"],

// ═══════════════════════════════════════════════════════
// PESCE CONSERVATO — Marca
// ═══════════════════════════════════════════════════════
["Rio Mare Tonno al Naturale",103,24,0,0.8,0,"Pesce & Frutti di Mare"],
["Rio Mare Tonno all'Olio d'Oliva",190,24,0,11,0,"Pesce & Frutti di Mare"],
["Rio Mare Tonno Leggero",104,24,0,0.8,0,"Pesce & Frutti di Mare"],
["Rio Mare Filetti Sgombro al Naturale",145,20,0,7,0,"Pesce & Frutti di Mare"],
["Rio Mare Sardine all'Olio",195,21,0,12,0,"Pesce & Frutti di Mare"],
["Callipo Tonno all'Olio d'Oliva",193,24,0,10,0,"Pesce & Frutti di Mare"],
["Callipo Tonno al Naturale",105,24,0,1,0,"Pesce & Frutti di Mare"],
["Mare Aperto Tonno al Naturale",102,24,0,0.8,0,"Pesce & Frutti di Mare"],
["Nostromo Tonno all'Olio",192,24,0,11,0,"Pesce & Frutti di Mare"],
["Nostromo Tonno al Naturale",103,24,0,0.9,0,"Pesce & Frutti di Mare"],
["Salmone Affumicato Salvagno",142,23,0,5.5,0,"Pesce & Frutti di Mare"],
["Bontà del Mare Acciughe sott'olio",204,20,0,14,0,"Pesce & Frutti di Mare"],
["King Oscar Sardine",208,20,0,14,0,"Pesce & Frutti di Mare"],

// ═══════════════════════════════════════════════════════
// SUGHI & CONDIMENTI — Marca
// ═══════════════════════════════════════════════════════
["Barilla Sugo Basilico",48,1.6,6.5,2,1.5,"Sughi & Conserve"],
["Barilla Sugo Pomodoro e Ricotta",60,2.2,7,2.8,1.2,"Sughi & Conserve"],
["Barilla Sugo Arrabbiata",45,1.8,6,1.8,1.5,"Sughi & Conserve"],
["Barilla Sugo Pesto Genovese",385,5,4,39,2,"Sughi & Conserve"],
["Cirio Pomodori Pelati",20,1.1,3.5,0.2,1,"Sughi & Conserve"],
["Cirio Passata di Pomodoro",36,1.8,6.5,0.2,1.5,"Sughi & Conserve"],
["Mutti Passata di Pomodoro",38,2,6.5,0.2,1.5,"Sughi & Conserve"],
["Mutti Pomodori Pelati",22,1.2,3.8,0.2,1,"Sughi & Conserve"],
["Mutti Concentrato di Pomodoro",88,5,15,0.2,3,"Sughi & Conserve"],
["Heinz Ketchup",110,1.5,26,0.1,0.8,"Sughi & Conserve"],
["Calvé Maionese",670,1.5,2,74,0,"Sughi & Conserve"],
["Calvé Maionese Light",275,1.3,8,26,0,"Sughi & Conserve"],
["Calvé Senape",80,4.8,5.5,4,2.5,"Sughi & Conserve"],
["Star Dado Classico (per 100ml brodo)",5,0.3,0.5,0.2,0,"Sughi & Conserve"],
["Knorr Brodo di Pollo (per 100ml)",5,0.4,0.6,0.1,0,"Sughi & Conserve"],
["Saclà Pesto Genovese",480,5.5,3.5,49,2,"Sughi & Conserve"],
["Saclà Pesto Rosso",295,5,10,27,2.5,"Sughi & Conserve"],

// ═══════════════════════════════════════════════════════
// SURGELATI — Marca
// ═══════════════════════════════════════════════════════
["Findus Merluzzo alla Mugnaia",145,15,8,6,0.5,"Surgelati"],
["Findus Bastoncini di Pesce",215,12,20,9,1,"Surgelati"],
["Findus Piselli Primavera",67,5.3,8,0.6,6,"Surgelati"],
["Findus Spinaci Foglia",20,2.7,1.2,0.5,2,"Surgelati"],
["Findus Fagiolini",28,1.8,4.5,0.1,3,"Surgelati"],
["Birdseye Piselli",67,5.3,8,0.6,6,"Surgelati"],
["Orogel Funghi Misti",22,3,3,0.3,1,"Surgelati"],
["Orogel Minestrone",45,2.5,7,0.5,2.5,"Surgelati"],
["Orogel Verdure alla Griglia",45,2,6,1,3,"Surgelati"],
["Rosa dell'Angelo Pizza Margherita",235,10,32,8,2,"Surgelati"],
["Dr. Oetker Pizza Mozzarella",248,10,32,9,2,"Surgelati"],
["Ristorante Dr. Oetker Pizza Tonno",265,12,33,9,2,"Surgelati"],
["Bofrost Salmone al Forno",185,22,0,11,0,"Surgelati"],
["Bofrost Merluzzo al Vapore",85,18,0,1.5,0,"Surgelati"],

// ═══════════════════════════════════════════════════════
// BEVANDE — Marca
// ═══════════════════════════════════════════════════════
["Coca-Cola Classica",42,0,10.6,0,0,"Bevande"],
["Coca-Cola Zero",0.4,0,0,0,0,"Bevande"],
["Coca-Cola Light",0.8,0,0.1,0,0,"Bevande"],
["Fanta Arancia",41,0,9.8,0,0,"Bevande"],
["Sprite",42,0,10.2,0,0,"Bevande"],
["San Pellegrino Aranciata",49,0.4,12,0.1,0,"Bevande"],
["San Pellegrino Limonata",29,0.2,7,0.1,0,"Bevande"],
["San Pellegrino Acqua Frizzante",0,0,0,0,0,"Bevande"],
["Acqua Panna Naturale",0,0,0,0,0,"Bevande"],
["Gatorade Arancia",26,0,6.7,0,0,"Bevande"],
["Red Bull Energy",47,0,11,0,0,"Bevande"],
["Red Bull Zero",4,0.7,0,0,0,"Bevande"],
["Tropicana Arancia 100%",43,0.8,9.9,0.2,0.3,"Bevande"],
["Yoga Succo Pesca",57,0.3,13.5,0.1,0.5,"Bevande"],
["Yoga Succo Mela",47,0.1,11.5,0.1,0.2,"Bevande"],
["Innocent Smoothie Frutti Rossi",55,0.6,12,0.2,1,"Bevande"],
["Nescafé Classico (polvere)",356,19,45,2,0,"Bevande"],
["Lavazza Caffè Espresso (polvere)",339,16,44,4,0,"Bevande"],
["The Caldo Nestlé Pesca",20,0,4.8,0,0,"Bevande"],
["Lipton Ice Tea Pesca",27,0.1,6.4,0.1,0,"Bevande"],
["Lipton Ice Tea Limone",26,0.1,6.2,0.1,0,"Bevande"],

// ═══════════════════════════════════════════════════════
// PROTEINE & INTEGRATORI — Marca
// ═══════════════════════════════════════════════════════
["Whey Protein My Protein Impact (Vaniglia)",382,80,5,4.5,1,"Integratori"],
["Whey Protein Optimum Nutrition Gold Standard",398,79,5,5,1,"Integratori"],
["Whey Protein Dymatize ISO 100",369,82,3,1.5,1.5,"Integratori"],
["Protein Bar My Protein",370,30,38,9,3,"Integratori"],
["Protein Bar Quest Cioccolato",378,30,41,9,26,"Integratori"],
["Protein Bar Kind Cioccolato",393,12,44,18,7,"Integratori"],
["Grenade Carb Killa Bar",369,31,39,9,5,"Integratori"],
["Huel Polvere Pasto Completo",400,30,37,13,7,"Integratori"],
["Barebells Protein Bar",354,27,36,10,1,"Integratori"],

// ═══════════════════════════════════════════════════════
// SNACK & PATATINE — Marca
// ═══════════════════════════════════════════════════════
["Pringles Original",533,5.5,52,34,1.8,"Snack & Patatine"],
["Pringles Sour Cream",533,5.5,53,34,1.5,"Snack & Patatine"],
["Lay's Classiche",536,7,53,33,4,"Snack & Patatine"],
["Lay's al Formaggio",527,6.5,53,32,4,"Snack & Patatine"],
["San Carlo Classiche",526,6.5,52,32,3.5,"Snack & Patatine"],
["San Carlo Più Gusto",534,6.5,52,33,3.5,"Snack & Patatine"],
["Ruffles Paprika",514,6,54,30,4,"Snack & Patatine"],
["Popcorn Pop Secret Burro",486,8,57,26,8,"Snack & Patatine"],
["Popcorn Naturale Bio",382,12,66,5,13,"Snack & Patatine"],
["Crackers Tuc Classici",486,7,62,22,2,"Snack & Patatine"],
["Fonzies",498,6,59,26,2,"Snack & Patatine"],
["Cipster",519,5.5,55,30,3.5,"Snack & Patatine"],
["Doritos Nacho Cheese",488,7,60,23,4,"Snack & Patatine"],

// ═══════════════════════════════════════════════════════
// OLIO, BURRO & GRASSI — Marca
// ═══════════════════════════════════════════════════════
["Bertolli Olio EVO Classico",899,0,0,100,0,"Condimenti & Oli"],
["Filippo Berio Olio EVO",899,0,0,100,0,"Condimenti & Oli"],
["De Cecco Olio EVO",899,0,0,100,0,"Condimenti & Oli"],
["Carapelli Olio EVO",899,0,0,100,0,"Condimenti & Oli"],
["Sasso Olio di Semi Girasole",899,0,0,100,0,"Condimenti & Oli"],
["Lurpak Burro Non Salato",744,0.7,0.5,82,0,"Condimenti & Oli"],
["Lurpak Burro Leggermente Salato",743,0.7,0.5,82,0,"Condimenti & Oli"],
["Président Burro Francese",744,0.6,0.5,82,0,"Condimenti & Oli"],
["Vallé Margarina",527,0.2,0.3,58,0,"Condimenti & Oli"],
["Vallé Leggera Margarina",357,0.2,0.3,38,0,"Condimenti & Oli"],
["Becel Margarina Pro-Activ",449,0,0.5,49,0,"Condimenti & Oli"],

// ═══════════════════════════════════════════════════════
// LEGUMI CONSERVATI — Marca
// ═══════════════════════════════════════════════════════
["Bonduelle Ceci in Scatola",119,7.5,18.5,1.5,5.5,"Legumi"],
["Bonduelle Lenticchie in Scatola",96,8,13.5,0.4,4.5,"Legumi"],
["Bonduelle Fagioli Borlotti",100,7.5,16,0.5,5,"Legumi"],
["Bonduelle Fagioli Cannellini",88,7,13,0.4,4.5,"Legumi"],
["Bonduelle Mais Dolce",89,2.8,17,1.3,2,"Legumi"],
["Bonduelle Piselli Fini",60,4,8,0.5,5,"Legumi"],
["De Rica Pomodori Pelati",22,1.1,3.8,0.2,1,"Legumi"],
["Valfrutta Ceci",119,7.5,18,1.5,5.5,"Legumi"],
["Valfrutta Fagioli Borlotti",100,7.5,16,0.5,5,"Legumi"],
["Valfrutta Lenticchie",96,8,13,0.4,4.5,"Legumi"],

// ═══════════════════════════════════════════════════════
// DOLCI & DESSERT — Marca
// ═══════════════════════════════════════════════════════
["Mulino Bianco Crostatina Marmellata",402,4.5,58,17,1.5,"Dolci & Dessert"],
["Mulino Bianco Merendina Pan di Stelle",481,7.5,67,21,2,"Dolci & Dessert"],
["Kinder Delice",382,6.5,52,17,0.5,"Dolci & Dessert"],
["Kinder Maxi",551,7.1,58,30.5,0.5,"Dolci & Dessert"],
["Ferrero Mon Chéri",488,5,60,25,1,"Dolci & Dessert"],
["Paneangeli Torta Paradiso pronta",355,6,55,13,0.5,"Dolci & Dessert"],
["Cameo Tiramisù (pronto)",243,5,27,13,0.5,"Dolci & Dessert"],
["Galbani Panna da Montare",338,2.3,3.5,35,0,"Dolci & Dessert"],
["Cannamela Vanillina",0,0,0,0,0,"Dolci & Dessert"],

// ═══════════════════════════════════════════════════════
// CEREALI & DERIVATI — Generici aggiornati
// ═══════════════════════════════════════════════════════
["Pasta di semola (cruda)",355,13,72,2,3,"Cereali & Pane"],
["Pasta integrale (cruda)",335,13,64,2.5,8,"Cereali & Pane"],
["Pasta di semola (cotta)",155,5.5,30,0.9,1.4,"Cereali & Pane"],
["Pasta integrale (cotta)",124,4.5,24,1,3,"Cereali & Pane"],
["Riso bianco (crudo)",338,7,79,0.4,0.4,"Cereali & Pane"],
["Riso integrale (crudo)",335,7.5,73,2.2,3.5,"Cereali & Pane"],
["Riso bianco (cotto)",116,2.7,26,0.3,0.3,"Cereali & Pane"],
["Riso integrale (cotto)",110,2.5,23,0.9,1.8,"Cereali & Pane"],
["Pane bianco",275,9,55,1.5,2.2,"Cereali & Pane"],
["Pane integrale",224,8.5,42,1.9,6.5,"Cereali & Pane"],
["Pane di segale",220,8,45,1.7,6,"Cereali & Pane"],
["Grissini",416,12,72,10,2,"Cereali & Pane"],
["Crackers generici",428,10,72,12,3,"Cereali & Pane"],
["Gallette di riso",388,7,84,3,2,"Cereali & Pane"],
["Fiocchi di avena",379,13,66,7,10,"Cereali & Pane"],
["Farina 00",341,10,75,1,3,"Cereali & Pane"],
["Farina integrale",329,12,68,2,10,"Cereali & Pane"],
["Polenta (cruda)",356,8.7,77,3.8,2,"Cereali & Pane"],
["Polenta (cotta)",72,1.8,15,0.8,0.5,"Cereali & Pane"],
["Farro (cotto)",150,6,28,1,4,"Cereali & Pane"],
["Orzo perlato (cotto)",123,2.5,28,0.4,1,"Cereali & Pane"],
["Quinoa (cotta)",120,4.4,21.3,1.9,2.8,"Cereali & Pane"],
["Cous cous (cotto)",112,3.8,23,0.2,1.4,"Cereali & Pane"],
["Gnocchi di patate",128,2.8,26,0.6,1,"Cereali & Pane"],
["Piadina",295,9,47,9,2,"Cereali & Pane"],
["Fette biscottate generiche",385,10,78,3.5,3,"Cereali & Pane"],

// ═══════════════════════════════════════════════════════
// CARNE — Generica
// ═══════════════════════════════════════════════════════
["Petto di pollo (crudo)",110,23,0,2.5,0,"Carne & Pollame"],
["Petto di pollo (cotto)",165,31,0,3.6,0,"Carne & Pollame"],
["Coscia di pollo (cotta)",195,27,0,10,0,"Carne & Pollame"],
["Pollo intero (arrosto)",215,25,0,13,0,"Carne & Pollame"],
["Petto di tacchino (crudo)",104,23,0,1.5,0,"Carne & Pollame"],
["Petto di tacchino (cotto)",157,29,0,3.8,0,"Carne & Pollame"],
["Bistecca manzo magra",174,28,0,6.5,0,"Carne & Pollame"],
["Manzo macinato 5% grassi",135,21,0,5.5,0,"Carne & Pollame"],
["Manzo macinato 20% grassi",254,17,0,21,0,"Carne & Pollame"],
["Filetto di manzo",131,22,0,4.5,0,"Carne & Pollame"],
["Vitello fesa",107,21,0,2.5,0,"Carne & Pollame"],
["Maiale lonza",185,22,0,11,0,"Carne & Pollame"],
["Agnello coscia",162,22,0,8,0,"Carne & Pollame"],
["Coniglio (cotto)",173,25,0,8,0,"Carne & Pollame"],
["Bresaola generica",151,32,0.5,2,0,"Salumi & Affettati"],
["Prosciutto cotto sgrassato",107,17,1.5,3.5,0,"Salumi & Affettati"],
["Prosciutto crudo",247,26,0,18,0,"Salumi & Affettati"],
["Würstel di pollo",165,12,2,12,0,"Salumi & Affettati"],
["Salame Milano",406,21,1,36,0,"Salumi & Affettati"],
["Mortadella",318,14,1.5,29,0,"Salumi & Affettati"],
["Speck",306,25,0.5,23,0,"Salumi & Affettati"],

// ═══════════════════════════════════════════════════════
// PESCE — Generico
// ═══════════════════════════════════════════════════════
["Salmone fresco",208,20,0,14,0,"Pesce & Frutti di Mare"],
["Salmone affumicato",142,23,0,5.5,0,"Pesce & Frutti di Mare"],
["Tonno fresco",144,23,0,6,0,"Pesce & Frutti di Mare"],
["Branzino (spigola)",82,18,0,2,0,"Pesce & Frutti di Mare"],
["Orata",109,19,0,4,0,"Pesce & Frutti di Mare"],
["Merluzzo fresco",82,18,0,1,0,"Pesce & Frutti di Mare"],
["Sogliola",86,17,0,2,0,"Pesce & Frutti di Mare"],
["Trota",110,18,0,4,0,"Pesce & Frutti di Mare"],
["Pesce spada",109,20,0,4,0,"Pesce & Frutti di Mare"],
["Sgombro fresco",205,19,0,14,0,"Pesce & Frutti di Mare"],
["Sardine fresche",177,20,0,11,0,"Pesce & Frutti di Mare"],
["Polpo (cotto)",164,24,4.4,6,0,"Pesce & Frutti di Mare"],
["Calamari (crudi)",69,15.6,0.7,0.9,0,"Pesce & Frutti di Mare"],
["Gamberi (crudi)",80,17,0.5,1,0,"Pesce & Frutti di Mare"],
["Gamberoni",83,17,0.5,1.5,0,"Pesce & Frutti di Mare"],
["Cozze (crude)",84,12,3.4,2.7,0,"Pesce & Frutti di Mare"],
["Vongole (crude)",72,11,3,1.7,0,"Pesce & Frutti di Mare"],
["Baccalà (ammollato)",81,17.5,0,1.5,0,"Pesce & Frutti di Mare"],

// ═══════════════════════════════════════════════════════
// UOVA & LATTICINI — Generici
// ═══════════════════════════════════════════════════════
["Uovo intero (50g)",75,6.5,0.3,5.5,0,"Uova"],
["Albume d'uovo",52,11,0.7,0.2,0,"Uova"],
["Tuorlo d'uovo",322,16,0.3,29,0,"Uova"],
["Yogurt greco 0%",57,10,3.5,0.2,0,"Latticini & Formaggi"],
["Yogurt greco intero",97,9,4,6,0,"Latticini & Formaggi"],
["Yogurt naturale intero",61,3.5,4.7,3.3,0,"Latticini & Formaggi"],
["Kefir",56,3.3,4.3,2.5,0,"Latticini & Formaggi"],
["Ricotta vaccina",138,11,4,9,0,"Latticini & Formaggi"],
["Ricotta light",90,11,4,3,0,"Latticini & Formaggi"],
["Mozzarella vaccina",248,18,2.2,19,0,"Latticini & Formaggi"],
["Mozzarella di bufala",263,17,0.5,22,0,"Latticini & Formaggi"],
["Parmigiano Reggiano",392,33,0,29,0,"Latticini & Formaggi"],
["Grana Padano",384,33,0,28,0,"Latticini & Formaggi"],
["Pecorino Romano",387,26,0,31,0,"Latticini & Formaggi"],
["Mascarpone",442,5.3,4.5,45,0,"Latticini & Formaggi"],
["Cottage cheese",98,11,3.4,4.3,0,"Latticini & Formaggi"],
["Gorgonzola",324,19,0,28,0,"Latticini & Formaggi"],
["Burro",758,0.5,0.6,84,0,"Latticini & Formaggi"],
["Panna fresca 35%",338,2,3,35,0,"Latticini & Formaggi"],
["Latte intero",64,3.4,4.8,3.6,0,"Latticini & Formaggi"],
["Latte parzialmente scremato",46,3.4,4.8,1.5,0,"Latticini & Formaggi"],
["Latte scremato",34,3.4,5,0.1,0,"Latticini & Formaggi"],

// ═══════════════════════════════════════════════════════
// LEGUMI — Generici
// ═══════════════════════════════════════════════════════
["Lenticchie (secche)",291,23,50,1,11,"Legumi"],
["Lenticchie (cotte)",116,9,20,0.4,4.4,"Legumi"],
["Ceci (secchi)",316,21,47,5,15,"Legumi"],
["Ceci (cotti)",180,10,30,3,8,"Legumi"],
["Fagioli borlotti (cotti)",139,9,22,0.7,7,"Legumi"],
["Fagioli cannellini (cotti)",125,8.5,21,0.5,6,"Legumi"],
["Piselli (freschi)",73,5,10,0.4,5,"Legumi"],
["Edamame (cotti)",122,11,8.9,5.2,5.2,"Legumi"],
["Fave (cotte)",72,6,9,0.5,5,"Legumi"],
["Hummus",177,8,14,11,6,"Legumi"],
["Tofu naturale",76,8,1.9,4.5,0.3,"Legumi"],
["Tempeh",193,19,8.9,10.8,0,"Legumi"],

// ═══════════════════════════════════════════════════════
// VERDURE — Generiche
// ═══════════════════════════════════════════════════════
["Insalata mista",15,1.2,1.8,0.3,2,"Verdure"],
["Lattuga",13,1.3,1.3,0.3,1.5,"Verdure"],
["Rucola",25,2.6,2,0.7,1.6,"Verdure"],
["Spinaci (crudi)",23,2.9,1.4,0.4,2.2,"Verdure"],
["Cavolo nero",35,3.3,3.1,0.7,3.1,"Verdure"],
["Broccoli",34,2.8,5,0.4,2.6,"Verdure"],
["Cavolfiore",25,1.9,4.5,0.1,2,"Verdure"],
["Zucchine",17,1.3,2.5,0.2,1,"Verdure"],
["Peperone rosso",31,1,6,0.3,2.1,"Verdure"],
["Peperone giallo",27,1,5,0.2,1.5,"Verdure"],
["Pomodoro fresco",18,0.9,3.5,0.2,1.2,"Verdure"],
["Pomodori ciliegino",18,0.9,3.6,0.2,1.2,"Verdure"],
["Cetriolo",10,0.5,1.8,0.1,0.7,"Verdure"],
["Melanzana",25,1.1,4.5,0.2,2.5,"Verdure"],
["Carota",35,0.9,7.9,0.2,3,"Verdure"],
["Finocchio",31,1.2,5.9,0.2,3.1,"Verdure"],
["Sedano",16,0.7,2.9,0.2,1.8,"Verdure"],
["Asparagi",20,2.2,2,0.2,2.1,"Verdure"],
["Fagiolini",28,1.8,5,0.1,3.4,"Verdure"],
["Barbabietola",44,1.7,9,0.2,2,"Verdure"],
["Radicchio",22,1.4,3.6,0.2,2,"Verdure"],
["Carciofo",47,2.7,10.5,0.2,5.5,"Verdure"],
["Cipolla",40,1.1,8.7,0.1,1.7,"Verdure"],
["Porro",29,1.8,5.2,0.3,2.2,"Verdure"],
["Aglio",149,6.4,29,0.5,2.1,"Verdure"],
["Funghi champignon",22,3.1,3.3,0.3,1,"Verdure"],
["Funghi porcini freschi",27,3.9,4.4,0.7,2.5,"Verdure"],
["Patata",77,2,16.9,0.1,1.8,"Verdure"],
["Patata dolce (cotta)",90,2,21,0.1,3,"Verdure"],
["Zucca",26,1.1,4.4,0.1,1.1,"Verdure"],
["Mais in scatola",86,2.7,17,1.2,1.5,"Verdure"],
["Cime di rapa (cotte)",25,2.5,2.8,0.3,3,"Verdure"],
["Verza",27,1.5,4.8,0.2,2.5,"Verdure"],
["Bietola (cotta)",20,1.6,3.5,0.1,1.5,"Verdure"],

// ═══════════════════════════════════════════════════════
// FRUTTA — Generica
// ═══════════════════════════════════════════════════════
["Mela",52,0.3,13,0.2,2.4,"Frutta"],
["Pera",57,0.4,13,0.1,3.1,"Frutta"],
["Banana",89,1.1,22,0.3,2.6,"Frutta"],
["Arancia",47,0.9,11.7,0.1,2.4,"Frutta"],
["Mandarino",53,0.8,12,0.3,1.8,"Frutta"],
["Pompelmo",42,0.8,10.6,0.1,1.6,"Frutta"],
["Limone",22,0.4,6.9,0.2,0.3,"Frutta"],
["Uva bianca",67,0.6,17,0.4,0.9,"Frutta"],
["Fragole",32,0.7,7.1,0.3,2,"Frutta"],
["Mirtilli",57,0.7,14,0.3,2.4,"Frutta"],
["Lamponi",52,1.2,12,0.7,6.5,"Frutta"],
["More",43,1.4,9.6,0.5,5.3,"Frutta"],
["Kiwi",61,1.1,14.7,0.5,3,"Frutta"],
["Ananas fresco",50,0.5,13,0.1,1.4,"Frutta"],
["Mango",60,0.8,15,0.4,1.6,"Frutta"],
["Anguria",30,0.6,7.6,0.2,0.4,"Frutta"],
["Melone",34,0.8,8,0.2,0.9,"Frutta"],
["Pesca fresca",39,0.9,9.5,0.3,1.5,"Frutta"],
["Albicocca",48,1.4,11,0.4,2,"Frutta"],
["Prugna fresca",46,0.7,11,0.3,1.4,"Frutta"],
["Ciliegia",63,1.1,16,0.2,2.1,"Frutta"],
["Avocado",160,2,8.5,15,6.7,"Frutta"],
["Cachi",70,0.7,18.6,0.2,2.5,"Frutta"],
["Melograno",83,1.7,18.7,1.2,4,"Frutta"],
["Castagne (cotte)",213,2.9,45,1.3,5.9,"Frutta"],
["Dattero secco",282,1.8,75,0.4,8,"Frutta"],
["Fico secco",249,3.5,58,1.3,9.8,"Frutta"],
["Albicocca secca",241,3.4,57,0.5,7.3,"Frutta"],
["Uvetta",301,3.1,75,0.5,3.7,"Frutta"],

// ═══════════════════════════════════════════════════════
// FRUTTA SECCA & SEMI
// ═══════════════════════════════════════════════════════
["Mandorle",579,21,22,50,12.5,"Frutta secca"],
["Noci",654,15,14,65,6.7,"Frutta secca"],
["Nocciole",628,15,17,61,9.7,"Frutta secca"],
["Anacardi",553,18,30,44,3.3,"Frutta secca"],
["Pistacchi",562,20,28,45,10.6,"Frutta secca"],
["Arachidi",567,26,16,49,8.5,"Frutta secca"],
["Pinoli",673,14,13,68,3.7,"Frutta secca"],
["Semi di girasole",584,21,20,51,8.6,"Frutta secca"],
["Semi di chia",486,17,42,31,34,"Frutta secca"],
["Semi di lino",534,18,29,42,27,"Frutta secca"],
["Semi di zucca",559,30,11,49,6,"Frutta secca"],
["Burro di arachidi",598,25,20,51,6,"Frutta secca"],
["Tahini (crema sesamo)",595,17,21,54,9,"Frutta secca"],

// ═══════════════════════════════════════════════════════
// OLI & CONDIMENTI — Generici
// ═══════════════════════════════════════════════════════
["Olio extravergine di oliva",899,0,0,100,0,"Condimenti & Oli"],
["Olio di semi di girasole",899,0,0,100,0,"Condimenti & Oli"],
["Aceto di vino",21,0,1,0,0,"Condimenti & Oli"],
["Aceto balsamico di Modena",88,0.5,17,0,0,"Condimenti & Oli"],
["Salsa di soia",61,10,5,0,0.1,"Condimenti & Oli"],
["Senape",66,4.4,5.8,4,2.8,"Condimenti & Oli"],
["Miele",304,0.3,82.4,0,0.2,"Condimenti & Oli"],
["Sciroppo d'acero",260,0,67,0.1,0,"Condimenti & Oli"],
["Marmellata generica",250,0.5,62,0.1,1,"Condimenti & Oli"],
["Zucchero bianco",400,0,100,0,0,"Condimenti & Oli"],
["Zucchero di canna",387,0,97,0,0,"Condimenti & Oli"],
["Sale",0,0,0,0,0,"Condimenti & Oli"],
["Pepe nero",255,10.4,64,3.3,26,"Condimenti & Oli"],

// ═══════════════════════════════════════════════════════
// PIATTI PRONTI & TIPICI ITALIANI
// ═══════════════════════════════════════════════════════
["Pizza margherita",235,10,32,8,2,"Piatti Pronti"],
["Pizza integrale",220,10,30,7,4,"Piatti Pronti"],
["Lasagne al ragù",250,13,28,10,2,"Piatti Pronti"],
["Risotto ai funghi",170,4.5,30,4.5,2,"Piatti Pronti"],
["Minestrone di verdure",45,2.5,7,1,2.5,"Piatti Pronti"],
["Pasta e fagioli",115,5.5,18,2,3,"Piatti Pronti"],
["Ribollita toscana",80,3,12,2.5,4,"Piatti Pronti"],
["Arancino di riso",211,5.5,33,6.5,1.5,"Piatti Pronti"],
["Supplì",222,8,28,8.5,1,"Piatti Pronti"],
["Poke Bowl salmone",150,12,14,5,2,"Piatti Pronti"],
["Poke Bowl tonno",140,14,13,3,2,"Piatti Pronti"],
["Burger vegetale",220,18,16,9,5,"Piatti Pronti"],
["Tofu burger",150,14,7,7,2,"Piatti Pronti"],
["Sushi Nigiri (pezzo)",40,2.5,6.5,0.5,0,"Piatti Pronti"],
["Sushi Maki (pezzo)",28,1.5,5,0.4,0.3,"Piatti Pronti"],
["Kebab (porzione 200g)",420,28,30,22,2,"Piatti Pronti"],
["Hummus e piadina",280,9,38,10,4,"Piatti Pronti"],
["Frittata di verdure",160,11,4,11,1.5,"Piatti Pronti"],
["Uova strapazzate",160,12,1,12,0,"Piatti Pronti"],
["Pancakes (2 medi)",220,7,32,7,1,"Piatti Pronti"],


// ═══════════════════════════════════════════════════════
// INTEGRATORI — Proteine Whey
// ═══════════════════════════════════════════════════════
["MyProtein Impact Whey Protein Cioccolato",400,80,7,8,1,"Integratori"],
["MyProtein Impact Whey Protein Vaniglia",397,80,6.5,7.5,1,"Integratori"],
["MyProtein Impact Whey Protein Fragola",396,80,6,7.5,1,"Integratori"],
["MyProtein Impact Whey Isolate Cioccolato",375,84,3,2,0.5,"Integratori"],
["MyProtein Impact Whey Isolate Naturale",370,84,2.5,2,0.5,"Integratori"],
["MyProtein Clear Whey Isolate",375,83,4,0.5,0,"Integratori"],
["MyProtein THE Whey+ Cioccolato",388,85,4,5,1,"Integratori"],
["Prozis Whey Protein Cioccolato",385,78,7,7,1,"Integratori"],
["Prozis Whey Protein Vaniglia",382,78,6.5,7,1,"Integratori"],
["Prozis Whey Isolate 90",370,85,3,1.5,0.5,"Integratori"],
["Prozis Whey Hydrolysate",365,88,2,1.5,0,"Integratori"],
["Prozis Lean Whey",355,72,10,5,3,"Integratori"],
["Optimum Nutrition Gold Standard Whey Cioccolato",398,79,5.5,5,1,"Integratori"],
["Optimum Nutrition Gold Standard Whey Vaniglia",395,79,5,5,1,"Integratori"],
["Optimum Nutrition Gold Standard Whey Fragola",396,79,5,4.5,1,"Integratori"],
["Optimum Nutrition Gold Standard Isolate",360,83,2.5,1,0.5,"Integratori"],
["Dymatize ISO 100 Cioccolato",369,82,3,1.5,0.5,"Integratori"],
["Dymatize ISO 100 Vaniglia",368,82,3,1.5,0.5,"Integratori"],
["Dymatize Elite Whey",390,78,6,6,1,"Integratori"],
["BSN Syntha-6 Cioccolato",388,70,15,9,2,"Integratori"],
["BSN Syntha-6 Vaniglia",385,70,14,9,2,"Integratori"],
["MuscleTech Nitro Tech Whey Gold",380,82,3,4,0.5,"Integratori"],
["Scitec Nutrition 100% Whey Protein",383,79,5,5,1,"Integratori"],
["Scitec Nutrition Whey Isolate",356,84,1.5,1.5,0,"Integratori"],
["Universal Nutrition Ultra Whey Pro",385,78,6,6,1,"Integratori"],
["Weider Gold Whey Protein",390,79,5.5,5,1,"Integratori"],
["Named Sport 100% Whey Isolate",370,84,3.5,2,0,"Integratori"],
["Named Sport Protein Bar Cioccolato",375,30,38,9,3,"Integratori"],
["Enervit Protein Bar",355,29,36,10,4,"Integratori"],
["Enervit Gymline Muscle Whey Protein",388,80,5,6,1,"Integratori"],
["GNC Pro Performance Whey",392,78,6,6,1,"Integratori"],
["Bulk Powders Pure Whey Protein",389,79,6,7,1,"Integratori"],
["Bulk Powders Whey Isolate 90",371,84,3,2,0.5,"Integratori"],
["PureProtein Whey",382,78,6,7,1,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Proteine Vegetali & Altri
// ═══════════════════════════════════════════════════════
["MyProtein Vegan Protein Blend Cioccolato",385,72,15,6,5,"Integratori"],
["MyProtein Soy Protein Isolate",360,82,3,2,1,"Integratori"],
["MyProtein Pea Protein Isolate",340,80,2,2,2,"Integratori"],
["Prozis Vegan Protein Cioccolato",378,72,14,6,5,"Integratori"],
["Prozis Rice Protein",358,80,3,2,1,"Integratori"],
["Prozis Pea Protein Isolate",342,80,2,1.5,2,"Integratori"],
["Optimum Nutrition Gold Standard Plant",371,73,12,5,5,"Integratori"],
["Dymatize All9 Amino",360,75,8,3,3,"Integratori"],
["Garden of Life Sport Organic Protein",357,72,9,4,5,"Integratori"],
["Sunwarrior Warrior Blend Vaniglia",390,70,20,6,5,"Integratori"],
["Named Sport Plant Protein",368,70,14,6,6,"Integratori"],
["EthicSport Proteine Vegetali",372,71,15,6,5,"Integratori"],
["Herbalife Formula 1 Vaniglia",336,18,61,4,4,"Integratori"],
["SlimFast Shake Cioccolato",340,20,44,6,5,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Caseine & Proteine a lento rilascio
// ═══════════════════════════════════════════════════════
["MyProtein Micellar Casein Vaniglia",370,77,9,4,1,"Integratori"],
["Optimum Nutrition Gold Standard Casein",366,75,10,4,1,"Integratori"],
["Dymatize Elite Casein",360,75,9,3,1,"Integratori"],
["Prozis Casein Protein",365,76,9,4,1,"Integratori"],
["Scitec Nutrition Casein Complex",358,74,10,4,1,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Creatina
// ═══════════════════════════════════════════════════════
["Creatina Monoidrato MyProtein (polvere)",0,0,0,0,0,"Integratori"],
["Creatina Monoidrato Optimum Nutrition",0,0,0,0,0,"Integratori"],
["Creatina Monoidrato Prozis",0,0,0,0,0,"Integratori"],
["Creatina Monoidrato Dymatize",0,0,0,0,0,"Integratori"],
["MyProtein Creatina HCL",0,0,0,0,0,"Integratori"],
["Prozis Creatina Micronizzata",0,0,0,0,0,"Integratori"],
["Scitec Creatina 100%",0,0,0,0,0,"Integratori"],
["Weider Creatina Pure",0,0,0,0,0,"Integratori"],
["Named Sport Creatina",0,0,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Aminoacidi BCAA
// ═══════════════════════════════════════════════════════
["MyProtein BCAA 2:1:1 (polvere)",0,76,0,0,0,"Integratori"],
["MyProtein BCAA 4:1:1 (polvere)",0,78,0,0,0,"Integratori"],
["Prozis BCAA 2:1:1",0,76,0,0,0,"Integratori"],
["Optimum Nutrition BCAA 1000 caps",0,78,0,0,0,"Integratori"],
["Dymatize BCAA Complex 2200",0,75,0,0,0,"Integratori"],
["Scitec Nutrition BCAA Xpress",0,76,0,0,0,"Integratori"],
["Named Sport BCAA 4:1:1",0,78,0,0,0,"Integratori"],
["Weider BCAA Drink",25,5,2,0,0,"Integratori"],
["EthicSport BCAA 8:1:1",0,80,0,0,0,"Integratori"],
["Enervit BCAA",0,76,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Aminoacidi Essenziali EAA
// ═══════════════════════════════════════════════════════
["MyProtein Essential Amino Acids EAA",0,78,0,0,0,"Integratori"],
["Prozis EAA",0,77,0,0,0,"Integratori"],
["Optimum Nutrition Essential AmiN.O. Energy",40,5,5,0,0,"Integratori"],
["Dymatize All9 Amino EAA",10,2,0,0,0,"Integratori"],
["Scitec EAA",0,78,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Carnitina
// ═══════════════════════════════════════════════════════
["L-Carnitina Liquida MyProtein",18,0,4.5,0,0,"Integratori"],
["L-Carnitina Liquida Prozis",17,0,4,0,0,"Integratori"],
["L-Carnitina 1000mg Named Sport",12,0,3,0,0,"Integratori"],
["L-Carnitina Tartrato MyProtein (polvere)",5,0,1,0,0,"Integratori"],
["L-Carnitina Weider",18,0,4.5,0,0,"Integratori"],
["Acetil L-Carnitina Prozis",5,0,0.5,0,0,"Integratori"],
["EthicSport L-Carnitina",16,0,4,0,0,"Integratori"],
["Enervit Carnitina Drink",32,0,8,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Pre-Workout & Energia
// ═══════════════════════════════════════════════════════
["MyProtein THE Pre-Workout",30,3,4,0.5,0,"Integratori"],
["Prozis Pre-Workout",28,3,3.5,0.5,0,"Integratori"],
["C4 Original Optimum Nutrition",20,0,4,0,0,"Integratori"],
["Optimum Nutrition Amino Energy",40,5,5,0,0,"Integratori"],
["USN Pre-Workout",35,4,4,0.5,0,"Integratori"],
["Scitec Jumbo Pre Workout",45,4,6,0.5,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Gainer & Massa
// ═══════════════════════════════════════════════════════
["MyProtein Hard Gainer Extreme",380,24,60,5,3,"Integratori"],
["Optimum Nutrition Serious Mass",382,23,64,3.5,2,"Integratori"],
["Dymatize Super Mass Gainer",388,22,65,4,2.5,"Integratori"],
["Prozis Mass Gainer",370,22,63,3,3,"Integratori"],
["Scitec Jumbo",388,24,63,4,2,"Integratori"],
["BSN True Mass",400,25,62,6,3,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Collagene & Articolazioni
// ═══════════════════════════════════════════════════════
["MyProtein Collagene Idrolizzato",356,88,0,0.5,0,"Integratori"],
["Prozis Collagene Marino",348,87,0,0.5,0,"Integratori"],
["Named Sport Collagene Plus",30,7,0.5,0,0,"Integratori"],
["Enervit Collagen",355,88,0,0.5,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Omega 3 & Vitamine
// ═══════════════════════════════════════════════════════
["Olio di Pesce Omega 3 MyProtein",700,0,0,80,0,"Integratori"],
["Omega 3 Prozis",690,0,0,78,0,"Integratori"],
["Vitamina D3 MyProtein (capsule)",0,0,0,0,0,"Integratori"],
["Magnesio MyProtein (polvere)",0,0,0,0,0,"Integratori"],
["ZMA MyProtein",0,0,0,0,0,"Integratori"],
["Glutammina MyProtein (polvere)",0,89,0,0,0,"Integratori"],
["Glutammina Prozis",0,89,0,0,0,"Integratori"],
["Beta-Alanina MyProtein",0,0,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// INTEGRATORI — Protein Bar & Snack Proteici
// ═══════════════════════════════════════════════════════
["Quest Bar Cioccolato",375,30,41,9,26,"Integratori"],
["Quest Bar Cookies & Cream",370,30,40,9,24,"Integratori"],
["Grenade Carb Killa Cioccolato",369,31,39,9,5,"Integratori"],
["Grenade Carb Killa Vaniglia",365,30,39,9,5,"Integratori"],
["Barebells Protein Bar Cioccolato",354,27,36,10,1,"Integratori"],
["Barebells Protein Bar Salted Peanut",357,28,35,11,1,"Integratori"],
["MyProtein Protein Bar Cioccolato",370,30,38,9,3,"Integratori"],
["Prozis Protein Bar Cioccolato",365,28,37,9,4,"Integratori"],
["Optimum Nutrition Protein Bar",355,27,36,10,2,"Integratori"],
["Kind Protein Bar Cioccolato",393,12,44,18,7,"Integratori"],
["Clif Builder's Bar Cioccolato",388,20,44,10,4,"Integratori"],
["Fulfil Vitamin & Protein Bar",361,29,40,8,5,"Integratori"],
["Go Macro Bar Cioccolato",385,11,54,14,3,"Integratori"],
["Rxbar Cioccolato",370,22,45,9,5,"Integratori"],

// ═══════════════════════════════════════════════════════
// PRODOTTI FRESCHI — Frutta & Verdura aggiuntivi
// ═══════════════════════════════════════════════════════
["Cachi Fuyu",65,0.8,16,0.2,3,"Frutta"],
["Papaya",43,0.5,11,0.3,1.8,"Frutta"],
["Guava",68,2.6,14,1,5.4,"Frutta"],
["Litchi",66,0.8,17,0.4,1.3,"Frutta"],
["Carambola",31,1,7,0.3,2.8,"Frutta"],
["Fico d'india",41,0.7,9.6,0.5,3.6,"Frutta"],
["Nespola",47,0.4,12,0.2,1.7,"Frutta"],
["Susina gialla",46,0.7,11,0.3,1.4,"Frutta"],
["Tamarindo",239,2.8,62.5,0.6,5.1,"Frutta"],
["Maracuja (frutto della passione)",97,2.2,23.4,0.7,10.4,"Frutta"],
["Rambutano",82,0.9,20.9,0.2,0.9,"Frutta"],
["Plantano (banana da cottura)",122,1.3,32,0.4,2.3,"Frutta"],
["Cocco fresco (polpa)",354,3.3,15.2,33.5,9,"Frutta"],
["Artiglio del diavolo (integratore)",0,0,0,0,0,"Frutta"],
["Melograno (sgranato)",83,1.7,18.7,1.2,4,"Frutta"],
["Lime",30,0.7,10.5,0.2,2.8,"Frutta"],
["Clementine",47,0.9,11.5,0.2,1.7,"Frutta"],
["Mandarancio",44,0.8,10.5,0.3,1.8,"Frutta"],
["Bergamotto (succo)",27,0.5,6.8,0.2,0.8,"Frutta"],
["Mirtilli rossi (cranberry)",46,0.4,12.2,0.1,4.6,"Frutta"],
["Goji (bacche secche)",349,14.3,77.1,0.4,8,"Frutta"],
["Acai (polpa surgelata)",70,1.5,4,5,2,"Frutta"],
["Noni (succo)",47,0.4,11,0.1,0.2,"Frutta"],
["Ciliegie Marasche",50,1,12.2,0.3,1.6,"Frutta"],
["Pesche noci (nettarine)",44,1.1,10.6,0.3,1.7,"Frutta"],
["Albicocche secche bio",243,3.4,57,0.5,7.3,"Frutta"],
["Prugne secche",240,2.5,57.5,0.5,7.1,"Frutta"],
["Mango essiccato",319,1.6,78,0.9,2.4,"Frutta"],
["Ananas essiccato",341,0.6,85,0.4,2.2,"Frutta"],
["Papaya essiccata",311,0.6,78,0.4,1.4,"Frutta"],
["Mirtilli essiccati",308,0.3,82,1.5,3.7,"Frutta"],
["Cranberry essiccati (zuccherati)",308,0.1,83,1.3,3.2,"Frutta"],

// ═══════════════════════════════════════════════════════
// VERDURE aggiuntive
// ═══════════════════════════════════════════════════════
["Carciofi sott'olio",90,2.5,4.5,7,3,"Verdure"],
["Peperoni sott'aceto",18,0.8,3,0.3,1.5,"Verdure"],
["Olive verdi",145,1,3.8,15,2.9,"Verdure"],
["Olive nere",180,1.6,3.1,18,3,"Verdure"],
["Capperi sotto sale",23,2.4,1.5,0.9,3.2,"Verdure"],
["Cetriolini sott'aceto",14,0.7,2.1,0.2,1.2,"Verdure"],
["Pomodori secchi sott'olio",213,5.1,23,12,4.5,"Verdure"],
["Peperoncino fresco",40,1.9,8.8,0.2,1.5,"Verdure"],
["Peperoncino secco",314,13,57,11,28,"Verdure"],
["Zenzero fresco",80,1.8,17,0.8,2,"Verdure"],
["Curcuma (polvere)",354,8,65,10,21,"Verdure"],
["Menta fresca",70,3.7,14.9,0.9,8,"Verdure"],
["Basilico fresco",23,3.2,1.1,0.6,1.6,"Verdure"],
["Prezzemolo fresco",36,3,6.3,0.8,3.3,"Verdure"],
["Rosmarino fresco",131,3.3,20.7,5.9,14.1,"Verdure"],
["Timo fresco",101,5.6,24,1.7,14,"Verdure"],
["Salvia fresca",315,10.6,60.7,12.7,40.3,"Verdure"],
["Aneto fresco",43,3.5,7,1.1,2.1,"Verdure"],
["Erba cipollina",30,3.3,4.4,0.7,2.5,"Verdure"],
["Coriandolo fresco",23,2.1,3.7,0.5,2.8,"Verdure"],
["Tarassaco (foglie)",45,2.7,9.2,0.7,3.5,"Verdure"],
["Acetosella",22,2,3.2,0.7,0,"Verdure"],
["Borragine",21,1.8,3.1,0.7,1.3,"Verdure"],
["Portulaca",20,2,3.4,0.4,0.5,"Verdure"],
["Indivia belga",17,1.3,3.5,0.2,1,"Verdure"],
["Cavolo romano",22,1.5,3.8,0.3,1.7,"Verdure"],
["Pak choi",13,1.5,2.2,0.2,1,"Verdure"],
["Bok choy",13,1.5,2.2,0.2,1,"Verdure"],
["Daikon",18,0.6,4.1,0.1,1.6,"Verdure"],
["Topinambur crudo",73,2,16.5,0.1,1.6,"Verdure"],
["Pastinaca",75,1.2,17.9,0.3,4.9,"Verdure"],
["Sedano rapa",42,1.5,9.2,0.3,1.8,"Verdure"],
["Kohlrabi",27,1.7,6.2,0.1,3.6,"Verdure"],
["Scorzonera",82,3.3,18.2,0.2,3.5,"Verdure"],
["Barbabietola cruda",43,1.6,9.6,0.2,2.8,"Verdure"],
["Germogli di soia",30,3.6,4.2,0.2,0.8,"Verdure"],
["Germogli di alfa alfa",23,4,2.1,0.7,1.9,"Verdure"],
["Germogli di fagioli mung",30,3,5.9,0.2,1.8,"Verdure"],

// ═══════════════════════════════════════════════════════
// CARNE aggiuntiva
// ═══════════════════════════════════════════════════════
["Petto d'anatra (cotto)",201,24,0,11,0,"Carne & Pollame"],
["Fegato di manzo",135,20,3.9,3.6,0,"Carne & Pollame"],
["Fegato di pollo",119,19,1,4,0,"Carne & Pollame"],
["Cuore di manzo",108,18,0.1,3.6,0,"Carne & Pollame"],
["Trippa di manzo (cotta)",100,15,0,4,0,"Carne & Pollame"],
["Lingua di manzo",284,17,0.2,24,0,"Carne & Pollame"],
["Cervella di vitello",140,10,0,11,0,"Carne & Pollame"],
["Rognone di manzo",97,16,0.8,3.1,0,"Carne & Pollame"],
["Cinghiale (cotto)",122,21,0,4,0,"Carne & Pollame"],
["Capriolo",120,22.5,0,3,0,"Carne & Pollame"],
["Cervo",120,22,0,3.2,0,"Carne & Pollame"],
["Fagiano (cotto)",160,24,0,7,0,"Carne & Pollame"],
["Quaglia (cotta)",192,25,0,10,0,"Carne & Pollame"],
["Piccione (cotto)",294,18.5,0,24,0,"Carne & Pollame"],
["Oca (cotta)",305,29,0,20,0,"Carne & Pollame"],
["Anatra (cotta)",337,19,0,28,0,"Carne & Pollame"],
["Bufalo (macinato magro)",136,21,0,5.5,0,"Carne & Pollame"],
["Carne di cavallo",110,21,0,2.5,0,"Carne & Pollame"],
["Carne di struzzo",140,22,0,4.5,0,"Carne & Pollame"],
["Lonza di maiale",195,21,0,12,0,"Carne & Pollame"],
["Pancetta tesa cruda",455,11,0,45,0,"Salumi & Affettati"],
["Pancetta tesa cotta",366,14,0.5,34,0,"Salumi & Affettati"],
["Guanciale",655,6,0.5,70,0,"Salumi & Affettati"],
["Salsiccia fresca di maiale",339,15,1,30,0,"Carne & Pollame"],
["Salsiccia di pollo",196,16,2,13,0,"Carne & Pollame"],
["Cotechino (cotto)",280,16,0.5,24,0,"Carne & Pollame"],
["Zampone (cotto)",320,18,1,27,0,"Carne & Pollame"],

// ═══════════════════════════════════════════════════════
// PESCE aggiuntivo
// ═══════════════════════════════════════════════════════
["Alici (alice) fresche",96,17,0,3,0,"Pesce & Frutti di Mare"],
["Anguilla",285,18,0,23,0,"Pesce & Frutti di Mare"],
["Carpa",127,18,0,6,0,"Pesce & Frutti di Mare"],
["Cernia",92,18,0,2.5,0,"Pesce & Frutti di Mare"],
["Dentice",103,19.5,0,2.8,0,"Pesce & Frutti di Mare"],
["Garfish (aguglia)",88,17,0,1.5,0,"Pesce & Frutti di Mare"],
["Luccio",84,19,0,1,0,"Pesce & Frutti di Mare"],
["Mormora",88,17.5,0,1.8,0,"Pesce & Frutti di Mare"],
["Muggine (cefalo)",124,18.5,0,5.5,0,"Pesce & Frutti di Mare"],
["Nasello",82,16,0,1.4,0,"Pesce & Frutti di Mare"],
["Palombo",93,18,0,2,0,"Pesce & Frutti di Mare"],
["Passera di mare",83,16.5,0,1.2,0,"Pesce & Frutti di Mare"],
["Pesce persico",91,19.5,0,0.9,0,"Pesce & Frutti di Mare"],
["Rana pescatrice (coda di rospo)",65,14.5,0,0.5,0,"Pesce & Frutti di Mare"],
["San Pietro",88,19,0,0.9,0,"Pesce & Frutti di Mare"],
["Sarago",91,17,0,2.5,0,"Pesce & Frutti di Mare"],
["Sgombro al naturale (scatola)",168,20,0,10,0,"Pesce & Frutti di Mare"],
["Totano",74,16,0.9,0.9,0,"Pesce & Frutti di Mare"],
["Triglia",96,18,0,2.7,0,"Pesce & Frutti di Mare"],
["Ostriche crude",69,9,3.9,2,0,"Pesce & Frutti di Mare"],
["Granchio (polpa cotta)",97,19,0,1.5,0,"Pesce & Frutti di Mare"],
["Aragosta (cotta)",90,18.8,0,1.3,0,"Pesce & Frutti di Mare"],
["Astice (cotta)",90,18.8,0,1.2,0,"Pesce & Frutti di Mare"],
["Ricci di mare",117,13,3.7,5,0,"Pesce & Frutti di Mare"],
["Bottarga di muggine",235,43,0,7,0,"Pesce & Frutti di Mare"],
["Caviale (storione)",264,24.6,4,17.9,0,"Pesce & Frutti di Mare"],
["Lumpfish caviale rosso",73,12,3,1.5,0,"Pesce & Frutti di Mare"],
["Surimi (bastoncini di granchio)",99,14,9,0.5,0,"Pesce & Frutti di Mare"],
["Baccalà in scatola (Findus)",97,19.5,0,1.5,0,"Pesce & Frutti di Mare"],

// ═══════════════════════════════════════════════════════
// LATTICINI & UOVA aggiuntivi
// ═══════════════════════════════════════════════════════
["Burrata (fresca)",330,11,2.5,30,0,"Latticini & Formaggi"],
["Stracciatella di burrata",440,10,2,42,0,"Latticini & Formaggi"],
["Feta DOP (greca)",264,14.2,4.1,21.3,0,"Latticini & Formaggi"],
["Halloumi (cipriota)",316,22,1,24,0,"Latticini & Formaggi"],
["Manchego (spagnolo)",395,25,0,32,0,"Latticini & Formaggi"],
["Brie de Meaux",316,20,0.5,26,0,"Latticini & Formaggi"],
["Comté",411,30,0,32,0,"Latticini & Formaggi"],
["Gruyère",413,30,0,33,0,"Latticini & Formaggi"],
["Raclette",368,28,0.5,29,0,"Latticini & Formaggi"],
["Fontina DOP",343,25,0.5,27,0,"Latticini & Formaggi"],
["Montasio DOP",369,28,0.5,29,0,"Latticini & Formaggi"],
["Piave Vecchio",377,33,0,28,0,"Latticini & Formaggi"],
["Castelmagno DOP",367,28,0.5,28,0,"Latticini & Formaggi"],
["Robiola",245,12,3.5,20,0,"Latticini & Formaggi"],
["Squacquerone",212,9.5,4,18,0,"Latticini & Formaggi"],
["Crescenza",209,12,1.5,17,0,"Latticini & Formaggi"],
["Strachino",210,12,1.5,17,0,"Latticini & Formaggi"],
["Quartirolo Lombardo",215,10,2.5,18,0,"Latticini & Formaggi"],
["Primo Sale",285,15,0.5,24,0,"Latticini & Formaggi"],
["Quark 0%",67,11,4,0.2,0,"Latticini & Formaggi"],
["Quark intero",112,8,4.5,6.5,0,"Latticini & Formaggi"],
["Skyr naturale Islandese",63,11,4,0.2,0,"Latticini & Formaggi"],
["Skyr Arla (0%)",64,11,4.5,0.2,0,"Latticini & Formaggi"],
["Uova di quaglia (5g l'una)",158,13,0.4,11,0,"Uova"],
["Uovo sodo M (50g)",78,6.7,0.4,5.7,0,"Uova"],
["Frittata classica (100g)",168,11.5,1,13,0,"Uova"],
["Uova in camicia",80,7,0.3,5.5,0,"Uova"],

// ═══════════════════════════════════════════════════════
// CEREALI & CARBOIDRATI aggiuntivi
// ═══════════════════════════════════════════════════════
["Teff (cotto)",101,3.9,19.9,0.7,2.8,"Cereali & Pane"],
["Amaranto (cotto)",102,3.8,18.7,1.6,2.1,"Cereali & Pane"],
["Sorgo (cotto)",109,3.6,22,1.2,2,"Cereali & Pane"],
["Grano saraceno (cotto)",92,3.4,19.9,0.6,2.7,"Cereali & Pane"],
["Kamut (cotto)",148,6,28,1,5,"Cereali & Pane"],
["Farro spelta (cotto)",127,5.5,26,0.7,3.9,"Cereali & Pane"],
["Bulgur (cotto)",83,3.1,18.6,0.2,4.5,"Cereali & Pane"],
["Freekeh (cotto)",121,5,22,1,5,"Cereali & Pane"],
["Riso Venere (cotto)",135,3,27,1.5,2.5,"Cereali & Pane"],
["Riso Rosso (cotto)",130,3,25,1.5,2,"Cereali & Pane"],
["Riso Carnaroli (cotto)",130,2.5,28,0.3,0.4,"Cereali & Pane"],
["Riso Arborio (cotto)",130,2.5,28,0.3,0.4,"Cereali & Pane"],
["Riso parboiled (cotto)",140,2.7,30,0.3,0.5,"Cereali & Pane"],
["Pasta di riso (cotta)",110,2,24,0.3,1,"Cereali & Pane"],
["Pasta di mais (cotta)",145,3,31,1,0.5,"Cereali & Pane"],
["Pasta di farro (cotta)",165,7,30,1.2,4,"Cereali & Pane"],
["Spaghetti di soia (cotti)",160,0.5,39,0.1,0.2,"Cereali & Pane"],
["Noodles di riso (cotti)",108,2,25,0.2,0.4,"Cereali & Pane"],
["Tortilla di mais",237,5,49,3.5,5,"Cereali & Pane"],
["Tortilla integrale",239,7.5,42,4.5,5.5,"Cereali & Pane"],
["Pane di mais (cornbread)",198,4.5,31,6,1.5,"Cereali & Pane"],
["Pane senza glutine Dr. Schär",246,3.2,50,3.5,1.5,"Cereali & Pane"],
["Focaccia genovese",310,8.5,45,11,2,"Cereali & Pane"],
["Ciabatta",271,9.4,50,2.5,2.5,"Cereali & Pane"],
["Baguette",258,9,52,1.5,2.5,"Cereali & Pane"],
["Pan brioche",336,9,47,13,1.5,"Cereali & Pane"],
["Pane di Altamura DOP",303,11.5,63,2.5,3.5,"Cereali & Pane"],
["Pane di Lariano",266,8.5,50,2.2,5,"Cereali & Pane"],
["Tarallo classico",440,10,64,17,3,"Cereali & Pane"],
["Grissino torinese",420,12,74,8.5,2.5,"Cereali & Pane"],
["Crostini per minestra",385,9,75,4,3,"Cereali & Pane"],
["Pane carré bianco",267,8.5,50,3.5,2.5,"Cereali & Pane"],
["Wrap di frumento",306,8.5,50,7,3,"Cereali & Pane"],

// ═══════════════════════════════════════════════════════
// LEGUMI aggiuntivi
// ═══════════════════════════════════════════════════════
["Soia verde (edamame, cruda)",147,13,8.1,7,6,"Legumi"],
["Fagioli azuki (cotti)",128,7.5,25,0.1,7.3,"Legumi"],
["Fagioli neri (cotti)",132,8.9,24,0.5,8.7,"Legumi"],
["Fagioli di Lima (cotti)",115,8,21.5,0.3,7,"Legumi"],
["Lupini lessati",119,15.1,10.5,2.7,2.4,"Legumi"],
["Cicerchie (cotte)",98,8.5,16,1.5,6,"Legumi"],
["Arachidi tostate salate",587,25,18,50,8,"Legumi"],
["Arachidi tostate non salate",582,25,16,49,8,"Legumi"],
["Burro di mandorle (senza zucchero)",614,21,20,56,11,"Legumi"],
["Burro di anacardi",553,18,30,44,3,"Legumi"],
["Miso (pasta)",199,12,26,6,5,"Legumi"],
["Natto",211,18,14,11,5.4,"Legumi"],

// ═══════════════════════════════════════════════════════
// DOLCI & DESSERT aggiuntivi
// ═══════════════════════════════════════════════════════
["Tiramisù artigianale",280,5,26,18,0,"Dolci & Dessert"],
["Panna cotta",210,3.5,22,12,0,"Dolci & Dessert"],
["Crème brûlée",196,3.5,16,13,0,"Dolci & Dessert"],
["Mousse al cioccolato",260,5,27,15,1,"Dolci & Dessert"],
["Budino al latte",128,3.5,17,5,0,"Dolci & Dessert"],
["Budino di riso",145,3.8,20,5.5,0.5,"Dolci & Dessert"],
["Gelato alla vaniglia",207,3.5,24,11,0,"Dolci & Dessert"],
["Gelato al cioccolato",218,4,26,12,0.5,"Dolci & Dessert"],
["Gelato al pistacchio",239,5,25,14,1,"Dolci & Dessert"],
["Sorbetto al limone",120,0.3,31,0.1,0.3,"Dolci & Dessert"],
["Sorbetto alla fragola",118,0.5,30,0.1,1,"Dolci & Dessert"],
["Granita al caffè",78,0.3,19,0,0,"Dolci & Dessert"],
["Cannolo siciliano (uno, 70g)",302,6.5,28,18,1,"Dolci & Dessert"],
["Sfogliatella riccia (una, 80g)",332,7,44,14,2,"Dolci & Dessert"],
["Babà al rum (uno, 70g)",241,5.5,35,8,1,"Dolci & Dessert"],
["Zeppola fritta (una, 60g)",247,4.5,32,12,1,"Dolci & Dessert"],
["Cassata siciliana (100g)",325,5.5,50,12,1.5,"Dolci & Dessert"],
["Panettone classico",348,7.5,55,11,2,"Dolci & Dessert"],
["Pandoro",388,7.5,60,14,1.5,"Dolci & Dessert"],
["Colomba pasquale",390,7.5,58,15,2,"Dolci & Dessert"],
["Torrone classico",430,8.5,68,16,2,"Dolci & Dessert"],
["Torrone al cioccolato",485,9,59,24,2.5,"Dolci & Dessert"],
["Amaretto (biscotto)",418,8,72,13,1.5,"Dolci & Dessert"],
["Cantucci toscani",450,10,68,17,2,"Dolci & Dessert"],
["Ricciarelli senesi",442,8,68,17,2,"Dolci & Dessert"],
["Cioccolata calda (tazza, 200ml)",190,4.5,28,8,2,"Dolci & Dessert"],
["Macarons francesi (uno, 15g)",65,0.8,9.5,3,0.2,"Dolci & Dessert"],
["Eclair al cioccolato (uno, 75g)",264,5,32,13,0.5,"Dolci & Dessert"],
["Croissant burro (uno, 70g)",277,5.5,31,15,1,"Dolci & Dessert"],
["Donut glassata (una, 60g)",252,3.5,32,13,0.5,"Dolci & Dessert"],
["Muffin cioccolato (uno, 100g)",406,5.5,59,18,1.5,"Dolci & Dessert"],
["Brownies (porzione 50g)",215,2.5,28,11,1,"Dolci & Dessert"],
["Cheesecake (porzione 120g)",338,6.5,35,20,0.5,"Dolci & Dessert"],

// ═══════════════════════════════════════════════════════
// BEVANDE aggiuntive
// ═══════════════════════════════════════════════════════
["Latte macchiato (200ml)",90,4.5,8.5,4,0,"Bevande"],
["Cappuccino (150ml)",55,3.2,4.5,2.5,0,"Bevande"],
["Caffè americano (200ml)",5,0.2,0.5,0,0,"Bevande"],
["Caffè d'orzo",8,0.3,1.5,0.1,0,"Bevande"],
["Tisana camomilla",1,0,0.2,0,0,"Bevande"],
["Tisana menta",2,0.1,0.3,0,0,"Bevande"],
["Tè verde matcha (polvere)",328,30.5,38.6,5.3,37.6,"Bevande"],
["Tè verde (infuso)",1,0,0.2,0,0,"Bevande"],
["Kombucha naturale",17,0,3.6,0,0,"Bevande"],
["Acqua di cocco",19,0.7,3.7,0.2,1.1,"Bevande"],
["Centrifuga verdure miste",35,1.5,7.5,0.3,1.5,"Bevande"],
["Smoothie banana latte",90,3.5,16,2,1,"Bevande"],
["Succo di carota 100%",40,0.9,9.3,0.2,0.8,"Bevande"],
["Succo di barbabietola 100%",44,1.6,9.6,0.2,2,"Bevande"],
["Succo di melograno 100%",64,0.2,15.5,0.3,0.3,"Bevande"],
["Succo di mirtillo 100%",46,0.4,10.5,0.1,0.2,"Bevande"],
["Latte di soia Barista",45,3.5,3.5,2,0.5,"Bevande"],
["Latte di riso Riso Scotti",47,0.1,9.9,1,0.3,"Bevande"],
["Bevanda di mandorla senza zucchero",24,0.5,3.3,1.1,0.2,"Bevande"],
["Birra chiara (330ml)",43,0.4,3.6,0,0,"Bevande"],
["Birra artigianale IPA (330ml)",65,0.5,6,0,0,"Bevande"],
["Vino rosso (100ml)",85,0.1,2.6,0,0,"Bevande"],
["Vino bianco secco (100ml)",77,0.1,2.1,0,0,"Bevande"],
["Prosecco DOC (100ml)",70,0.3,1.5,0,0,"Bevande"],
["Gin Tonic (200ml)",140,0,14,0,0,"Bevande"],

// ═══════════════════════════════════════════════════════
// PIATTI ETNICI & INTERNAZIONALI
// ═══════════════════════════════════════════════════════
["Ramen (ciotola, 450g)",495,26,62,15,3,"Piatti Pronti"],
["Pad Thai (porzione 300g)",486,22,65,18,3,"Piatti Pronti"],
["Curry di pollo (porzione 300g)",387,28,24,19,3,"Piatti Pronti"],
["Riso fritto alla cinese (300g)",420,13,65,13,2,"Piatti Pronti"],
["Gyoza (6 pezzi)",220,10,28,7,2,"Piatti Pronti"],
["Spring roll (uno, 80g)",176,4.5,22,8,1.5,"Piatti Pronti"],
["Falafel (uno, 30g)",70,4.5,8,2.5,3,"Piatti Pronti"],
["Shawarma di pollo (200g)",380,30,30,16,2,"Piatti Pronti"],
["Burrito pollo e riso (300g)",450,25,55,15,5,"Piatti Pronti"],
["Tacos al pastor (2 pz, 120g)",290,14,38,10,3,"Piatti Pronti"],
["Sushi California roll (6 pezzi)",180,6,33,3.5,1,"Piatti Pronti"],
["Sashimi salmone (6 fette, 90g)",155,16,0,10,0,"Piatti Pronti"],
["Tom Yum Soup (300ml)",85,6,8,3.5,1,"Piatti Pronti"],
["Wok di verdure (300g)",130,6,18,4,4,"Piatti Pronti"],
["Hummus con pita (150g)",320,10,40,12,5,"Piatti Pronti"],
["Dhal di lenticchie (300g)",225,13,35,5,8,"Piatti Pronti"],
["Paella valenciana (300g)",380,20,50,11,3,"Piatti Pronti"],
["Moussaka (porzione 300g)",310,16,22,17,3,"Piatti Pronti"],
["Börek (triangolo, 90g)",256,7.5,28,13,2,"Piatti Pronti"],
["Couscous con verdure (300g)",330,10,55,8,5,"Piatti Pronti"],

// ═══════════════════════════════════════════════════════
// FAST FOOD & STREET FOOD
// ═══════════════════════════════════════════════════════
["McDonald's Big Mac",257,13,24,12,2,"Fast Food & Street Food"],
["McDonald's McChicken",233,12,23,10,2,"Fast Food & Street Food"],
["McDonald's Filet-O-Fish",254,12,26,10,1.5,"Fast Food & Street Food"],
["McDonald's Patatine Medie (117g)",322,4.1,43,15,3.5,"Fast Food & Street Food"],
["McDonald's Chicken McNuggets 6 pz",250,15,16,13,1,"Fast Food & Street Food"],
["McDonald's McFlurry M&M's",218,4.5,34,7.5,0.5,"Fast Food & Street Food"],
["Burger King Whopper",252,12,21,13,2,"Fast Food & Street Food"],
["Burger King Crispy Chicken",280,13,27,13,2,"Fast Food & Street Food"],
["KFC Chicken Piece (100g)",245,16,10,15,0.5,"Fast Food & Street Food"],
["KFC Coleslaw (100g)",135,1.2,18,6.5,1.5,"Fast Food & Street Food"],
["Pizza Hut Margherita (fetta 90g)",215,9.5,29,7,1.5,"Fast Food & Street Food"],
["Subway Panino Pollo Teriyaki (6inch)",345,23,50,5,3,"Fast Food & Street Food"],
["Subway Panino Tonno (6inch)",395,20,47,14,3,"Fast Food & Street Food"],
["Hot dog classico (uno, 150g)",290,13,22,17,1.5,"Fast Food & Street Food"],
["Hamburger classico (uno, 150g)",320,19,28,14,1.5,"Fast Food & Street Food"],
["Cheeseburger classico",355,20,27,16,1.5,"Fast Food & Street Food"],
["Piadina romagnola con prosciutto",380,15,41,17,2,"Fast Food & Street Food"],
["Tramezzino al tonno",258,12,30,10,2,"Fast Food & Street Food"],
["Tramezzino al prosciutto",246,11,30,9,2,"Fast Food & Street Food"],
["Panino con porchetta (200g)",468,22,42,24,2,"Fast Food & Street Food"],

// ═══════════════════════════════════════════════════════
// NET INTEGRATORI — Linea completa
// ═══════════════════════════════════════════════════════
["Net Integratori Whey Protein Cacao",388,78,6.5,7,1,"Integratori"],
["Net Integratori Whey Protein Vaniglia",385,78,6,7,1,"Integratori"],
["Net Integratori Whey Protein Fragola",384,78,6,7,1,"Integratori"],
["Net Integratori Whey Protein Nocciola",387,78,6.5,7,1,"Integratori"],
["Net Integratori Whey Protein Cookies",389,77,7,8,1,"Integratori"],
["Net Integratori Whey Protein Banana",384,78,6,7,1,"Integratori"],
["Net Integratori Whey Isolate Cacao",368,84,3,2,0.5,"Integratori"],
["Net Integratori Whey Isolate Vaniglia",365,84,2.5,2,0.5,"Integratori"],
["Net Integratori Whey Isolate Fragola",365,84,2.5,2,0.5,"Integratori"],
["Net Integratori 100% Whey Zero Cacao",370,82,4,3,0.5,"Integratori"],
["Net Integratori 100% Whey Zero Vaniglia",368,82,3.5,3,0.5,"Integratori"],
["Net Integratori Hydro Whey",358,88,2,1,0,"Integratori"],
["Net Integratori Casein Protein Cacao",362,76,8,4,1,"Integratori"],
["Net Integratori Casein Protein Vaniglia",360,76,7.5,4,1,"Integratori"],
["Net Integratori Vegan Protein Cacao",378,72,14,6,5,"Integratori"],
["Net Integratori Vegan Protein Vaniglia",375,72,13,6,5,"Integratori"],
["Net Integratori Pea Protein",338,80,2,1.5,2,"Integratori"],
["Net Integratori Rice Protein",352,80,3,2,1,"Integratori"],
["Net Integratori BCAA 2:1:1 polvere",0,76,0,0,0,"Integratori"],
["Net Integratori BCAA 4:1:1 polvere",0,78,0,0,0,"Integratori"],
["Net Integratori BCAA 8:1:1 polvere",0,80,0,0,0,"Integratori"],
["Net Integratori BCAA + Glutammina",0,72,0,0,0,"Integratori"],
["Net Integratori EAA Essential Amino",0,77,0,0,0,"Integratori"],
["Net Integratori Creatina Monoidrato",0,0,0,0,0,"Integratori"],
["Net Integratori Creatina HCL",0,0,0,0,0,"Integratori"],
["Net Integratori L-Carnitina Liquida",16,0,4,0,0,"Integratori"],
["Net Integratori L-Carnitina 1000 compresse",0,0,0,0,0,"Integratori"],
["Net Integratori Acetil L-Carnitina",0,0,0,0,0,"Integratori"],
["Net Integratori Glutammina",0,89,0,0,0,"Integratori"],
["Net Integratori Beta-Alanina",0,0,0,0,0,"Integratori"],
["Net Integratori Arginina",0,0,0,0,0,"Integratori"],
["Net Integratori Pre-Workout",32,3,4,0.5,0,"Integratori"],
["Net Integratori Mass Gainer",378,22,63,4,2,"Integratori"],
["Net Integratori Gainer Pro",372,20,65,3,2,"Integratori"],
["Net Integratori Protein Bar Cacao",368,28,38,9,4,"Integratori"],
["Net Integratori Protein Bar Vaniglia",365,28,37,9,4,"Integratori"],
["Net Integratori Protein Snack",358,25,39,8,5,"Integratori"],
["Net Integratori Omega 3",695,0,0,78,0,"Integratori"],
["Net Integratori Vitamina D3",0,0,0,0,0,"Integratori"],
["Net Integratori Magnesio",0,0,0,0,0,"Integratori"],
["Net Integratori ZMA",0,0,0,0,0,"Integratori"],
["Net Integratori Collagene Idrolizzato",350,87,0,0.5,0,"Integratori"],
["Net Integratori Collagene + Vitamina C",345,86,1,0.5,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// YAMAMOTO NUTRITION
// ═══════════════════════════════════════════════════════
["Yamamoto Whey Protein Cacao",388,79,5.5,7,1,"Integratori"],
["Yamamoto Whey Protein Vaniglia",385,79,5,7,1,"Integratori"],
["Yamamoto Iso Whey Zero Cacao",362,85,2,1.5,0.5,"Integratori"],
["Yamamoto Iso Whey Zero Vaniglia",360,85,2,1.5,0.5,"Integratori"],
["Yamamoto Whey Hydro",355,89,1.5,1,0,"Integratori"],
["Yamamoto Vegan Protein",372,70,15,5,5,"Integratori"],
["Yamamoto BCAA 2:1:1",0,76,0,0,0,"Integratori"],
["Yamamoto Creatina Monoidrato",0,0,0,0,0,"Integratori"],
["Yamamoto L-Carnitina",16,0,4,0,0,"Integratori"],
["Yamamoto Pre-Workout",30,3,4,0.5,0,"Integratori"],
["Yamamoto Protein Bar",362,27,38,9,4,"Integratori"],
["Yamamoto Mass Protein",375,22,63,4,2,"Integratori"],

// ═══════════════════════════════════════════════════════
// +WATT (PIÙ WATT)
// ═══════════════════════════════════════════════════════
["+Watt Whey Protein Cacao",385,78,6,7,1,"Integratori"],
["+Watt Whey Protein Vaniglia",382,78,5.5,7,1,"Integratori"],
["+Watt Whey Isolate",362,84,3,2,0.5,"Integratori"],
["+Watt Vegan Protein",370,70,14,6,5,"Integratori"],
["+Watt BCAA 2:1:1",0,76,0,0,0,"Integratori"],
["+Watt BCAA 8:1:1",0,80,0,0,0,"Integratori"],
["+Watt Creatina",0,0,0,0,0,"Integratori"],
["+Watt L-Carnitina",16,0,4,0,0,"Integratori"],
["+Watt Pre-Workout Pump",28,3,3.5,0.5,0,"Integratori"],
["+Watt Protein Bar",360,27,38,9,4,"Integratori"],
["+Watt Mass Builder",372,20,65,3,2,"Integratori"],

// ═══════════════════════════════════════════════════════
// ETHICSPORT
// ═══════════════════════════════════════════════════════
["EthicSport Proteica Excellence Cacao",385,78,6,7,1,"Integratori"],
["EthicSport Proteica Excellence Vaniglia",382,78,5.5,7,1,"Integratori"],
["EthicSport Protein Vegan",368,70,14,6,5,"Integratori"],
["EthicSport BCAA 8:1:1",0,80,0,0,0,"Integratori"],
["EthicSport Creatina Plus",0,0,0,0,0,"Integratori"],
["EthicSport L-Carnitina Premium",16,0,4,0,0,"Integratori"],
["EthicSport Energia Rapida (gel)",95,0,23,0,0,"Integratori"],
["EthicSport Tecnica Forte (pre-workout)",30,3,4,0.5,0,"Integratori"],
["EthicSport Protein Bar Dark",355,25,38,9,5,"Integratori"],
["EthicSport Hydration (bevanda)",20,0,5,0,0,"Integratori"],
["EthicSport Collagene Premium",348,86,1,0.5,0,"Integratori"],
["EthicSport Omega 3 Fish Oil",690,0,0,77,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// ENERVIT — Linea completa
// ═══════════════════════════════════════════════════════
["Enervit Gymline Muscle Whey Cacao",388,80,5,6,1,"Integratori"],
["Enervit Gymline Muscle Whey Vaniglia",385,80,4.5,6,1,"Integratori"],
["Enervit Gymline 100% Whey Isolate",362,84,3,2,0.5,"Integratori"],
["Enervit Gymline Vegan Protein",368,70,14,6,5,"Integratori"],
["Enervit Gymline BCAA",0,76,0,0,0,"Integratori"],
["Enervit Gymline Creatina",0,0,0,0,0,"Integratori"],
["Enervit Carnitin Transport",30,0,7.5,0,0,"Integratori"],
["Enervit Sport Competition Bar",355,8,55,10,3,"Integratori"],
["Enervit Protein Sport Bar",345,24,37,9,4,"Integratori"],
["Enervit Gel (carboidrati)",90,0,22,0,0,"Integratori"],
["Enervit Sport Drink",38,0,9.5,0,0,"Integratori"],
["Enervit Recovery Drink",160,8,30,1,0,"Integratori"],
["Enervit R2 Sport (recovery)",152,8,29,1,0,"Integratori"],
["Enervit Protein Mousse Cacao",128,12,12,4,1,"Integratori"],

// ═══════════════════════════════════════════════════════
// NAMED SPORT — Linea completa
// ═══════════════════════════════════════════════════════
["Named Sport 100% Whey Protein Cacao",388,78,6.5,7,1,"Integratori"],
["Named Sport 100% Whey Protein Vaniglia",385,78,6,7,1,"Integratori"],
["Named Sport 100% Whey Protein Fragola",384,78,6,7,1,"Integratori"],
["Named Sport Whey Isolate 90 Cacao",368,84,3,2,0.5,"Integratori"],
["Named Sport Whey Isolate 90 Vaniglia",365,84,2.5,2,0.5,"Integratori"],
["Named Sport Total Protein Cacao",375,76,8,5,1,"Integratori"],
["Named Sport Vegan Protein",368,70,14,6,5,"Integratori"],
["Named Sport Plant Protein",365,70,13,6,6,"Integratori"],
["Named Sport BCAA 4:1:1",0,78,0,0,0,"Integratori"],
["Named Sport BCAA + B6",0,76,0,0,0,"Integratori"],
["Named Sport Creatina Monoidrato",0,0,0,0,0,"Integratori"],
["Named Sport L-Carnitina 1000",12,0,3,0,0,"Integratori"],
["Named Sport L-Glutammina",0,89,0,0,0,"Integratori"],
["Named Sport Pre-Workout",28,3,3.5,0.5,0,"Integratori"],
["Named Sport Mass Builder",375,20,65,3,2,"Integratori"],
["Named Sport Protein Bar Cacao",365,28,38,9,4,"Integratori"],
["Named Sport Protein Bar Vaniglia",362,28,37,9,4,"Integratori"],
["Named Sport Collagene + Vitamina C",348,86,1,0.5,0,"Integratori"],
["Named Sport Omega 3",692,0,0,78,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// SCITEC NUTRITION — Linea completa
// ═══════════════════════════════════════════════════════
["Scitec 100% Whey Protein Cacao",383,79,5,5,1,"Integratori"],
["Scitec 100% Whey Protein Vaniglia",380,79,4.5,5,1,"Integratori"],
["Scitec 100% Whey Protein Fragola",381,79,5,5,1,"Integratori"],
["Scitec 100% Whey Protein Cookies",385,78,6,6,1,"Integratori"],
["Scitec Whey Isolate",356,84,1.5,1.5,0,"Integratori"],
["Scitec Protein Delite",372,72,12,6,2,"Integratori"],
["Scitec Jumbo (mass gainer)",388,24,63,4,2,"Integratori"],
["Scitec Jumbo Hardcore",392,24,64,4.5,2,"Integratori"],
["Scitec 100% Casein Complex",358,74,10,4,1,"Integratori"],
["Scitec BCAA Xpress",0,76,0,0,0,"Integratori"],
["Scitec BCAA + Glutamine",0,68,0,0,0,"Integratori"],
["Scitec Creatina Monoidrato",0,0,0,0,0,"Integratori"],
["Scitec L-Carnitina 1500",20,0,5,0,0,"Integratori"],
["Scitec L-Glutammina",0,89,0,0,0,"Integratori"],
["Scitec Arginine Amplifier",0,0,0,0,0,"Integratori"],
["Scitec Hot Blood (pre-workout)",32,3,4,0.5,0,"Integratori"],
["Scitec Choco Pro Bar",365,27,38,9,4,"Integratori"],

// ═══════════════════════════════════════════════════════
// WEIDER — Linea completa
// ═══════════════════════════════════════════════════════
["Weider Gold Whey Protein Cacao",390,79,5.5,5,1,"Integratori"],
["Weider Gold Whey Protein Vaniglia",388,79,5,5,1,"Integratori"],
["Weider Gold Whey Protein Fragola",387,79,5,5,1,"Integratori"],
["Weider Iso Whey Zero Cacao",362,85,2,1.5,0.5,"Integratori"],
["Weider Iso Whey Zero Vaniglia",360,85,1.5,1.5,0.5,"Integratori"],
["Weider Vegan Protein Cacao",372,70,15,5,5,"Integratori"],
["Weider Mega Mass 4000",368,18,66,3,2,"Integratori"],
["Weider BCAA Recovery",0,76,0,0,0,"Integratori"],
["Weider Creatina Pure",0,0,0,0,0,"Integratori"],
["Weider L-Carnitina 1500",18,0,4.5,0,0,"Integratori"],
["Weider Pre-Workout",30,3,4,0.5,0,"Integratori"],
["Weider Protein Bar Cacao",360,27,37,10,4,"Integratori"],
["Weider Victory Endurance Gel",95,0,23,0,0,"Integratori"],
["Weider Collagene",348,87,0,0.5,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// BSN — Linea completa
// ═══════════════════════════════════════════════════════
["BSN Syntha-6 Cacao",388,70,15,9,2,"Integratori"],
["BSN Syntha-6 Vaniglia",385,70,14,9,2,"Integratori"],
["BSN Syntha-6 Fragola",385,70,14,9,2,"Integratori"],
["BSN Syntha-6 Edge",372,76,8,5,1,"Integratori"],
["BSN True Mass Cacao",400,25,62,6,3,"Integratori"],
["BSN True Mass 1200",430,28,70,7,3,"Integratori"],
["BSN NO-Xplode (pre-workout)",35,3,5,0.5,0,"Integratori"],
["BSN BCAA DNA",0,76,0,0,0,"Integratori"],
["BSN Creatina DNA",0,0,0,0,0,"Integratori"],
["BSN Protein Crisp Bar",365,27,37,10,4,"Integratori"],

// ═══════════════════════════════════════════════════════
// UNIVERSAL NUTRITION
// ═══════════════════════════════════════════════════════
["Universal Animal Whey Cacao",382,78,6,6,1,"Integratori"],
["Universal Animal Whey Vaniglia",380,78,5.5,6,1,"Integratori"],
["Universal Ultra Whey Pro",385,78,6,6,1,"Integratori"],
["Universal Real Gains (mass gainer)",412,27,65,7,3,"Integratori"],
["Universal Animal Pak (multivitaminico)",0,0,0,0,0,"Integratori"],
["Universal Animal Cuts",0,0,0,0,0,"Integratori"],
["Universal Creatina",0,0,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// MUSCLEPHARM
// ═══════════════════════════════════════════════════════
["MusclePharm Combat Protein Cacao",380,75,9,5,2,"Integratori"],
["MusclePharm Combat Protein Vaniglia",378,75,8.5,5,2,"Integratori"],
["MusclePharm Whey Protein Cacao",385,78,6,6,1,"Integratori"],
["MusclePharm BCAA 3:1:2",0,76,0,0,0,"Integratori"],
["MusclePharm Creatina",0,0,0,0,0,"Integratori"],
["MusclePharm Assault (pre-workout)",30,3,4,0.5,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// CELLUCOR
// ═══════════════════════════════════════════════════════
["Cellucor C4 Original (pre-workout)",20,0,4,0,0,"Integratori"],
["Cellucor C4 Extreme",25,0,5,0,0,"Integratori"],
["Cellucor C4 Sport",22,0,4.5,0,0,"Integratori"],
["Cellucor Whey Protein Cacao",382,76,7,6,1,"Integratori"],
["Cellucor Cor-Performance Whey",380,76,6.5,6,1,"Integratori"],
["Cellucor BCAA Sport",0,74,0,0,0,"Integratori"],
["Cellucor Creatina HCL",0,0,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// ALLNUTRITION
// ═══════════════════════════════════════════════════════
["AllNutrition Whey Protein Cacao",385,78,6,7,1,"Integratori"],
["AllNutrition Whey Protein Vaniglia",382,78,5.5,7,1,"Integratori"],
["AllNutrition Whey Isolate",362,84,3,2,0.5,"Integratori"],
["AllNutrition BCAA 2:1:1",0,76,0,0,0,"Integratori"],
["AllNutrition Creatina",0,0,0,0,0,"Integratori"],
["AllNutrition F**king Delicious Protein Bar",378,27,40,10,4,"Integratori"],
["AllNutrition Hard Mass (gainer)",378,22,63,4,2,"Integratori"],

// ═══════════════════════════════════════════════════════
// KEVIN LEVRONE
// ═══════════════════════════════════════════════════════
["Kevin Levrone Anabolic Mass Cacao",388,24,64,5,2,"Integratori"],
["Kevin Levrone Anabolic Whey Cacao",385,78,6,7,1,"Integratori"],
["Kevin Levrone Anabolic Iso Whey",362,85,2,1.5,0.5,"Integratori"],
["Kevin Levrone BCAA",0,76,0,0,0,"Integratori"],
["Kevin Levrone Creatina",0,0,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// GNC
// ═══════════════════════════════════════════════════════
["GNC Pro Performance Whey Cacao",392,78,6,6,1,"Integratori"],
["GNC Pro Performance Whey Vaniglia",390,78,5.5,6,1,"Integratori"],
["GNC Total Lean Burn 60",0,0,0,0,0,"Integratori"],
["GNC AMP Gold Whey",388,80,5,6,1,"Integratori"],
["GNC Mega Men Sport (multivitaminico)",0,0,0,0,0,"Integratori"],
["GNC L-Glutammina",0,89,0,0,0,"Integratori"],
["GNC Creatina Monoidrato",0,0,0,0,0,"Integratori"],
["GNC BCAA 2000",0,76,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// BULK POWDERS
// ═══════════════════════════════════════════════════════
["Bulk Powders Pure Whey Cacao",389,79,6,7,1,"Integratori"],
["Bulk Powders Pure Whey Vaniglia",387,79,5.5,7,1,"Integratori"],
["Bulk Powders Whey Isolate 90",371,84,3,2,0.5,"Integratori"],
["Bulk Powders Complete Protein",375,76,8,5,2,"Integratori"],
["Bulk Powders Vegan Protein",368,70,14,6,5,"Integratori"],
["Bulk Powders Macro Munch Bar",368,27,38,10,4,"Integratori"],
["Bulk Powders BCAA 2:1:1",0,76,0,0,0,"Integratori"],
["Bulk Powders Creatina Monoidrato",0,0,0,0,0,"Integratori"],
["Bulk Powders Complete Pre-Workout",28,3,3.5,0.5,0,"Integratori"],
["Bulk Powders L-Carnitina",15,0,3.8,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// PROZIS — Linea estesa
// ═══════════════════════════════════════════════════════
["Prozis Protein Pancake Cacao",358,32,42,6,4,"Integratori"],
["Prozis Protein Pancake Vaniglia",355,32,41,6,4,"Integratori"],
["Prozis Protein Oatmeal Cacao",368,25,50,6,5,"Integratori"],
["Prozis Protein Oatmeal Vaniglia",365,25,49,6,5,"Integratori"],
["Prozis Zero Bar Cacao",328,32,38,4,10,"Integratori"],
["Prozis Zero Bar Vaniglia",325,32,37,4,10,"Integratori"],
["Prozis Nuts & Whey Bar",388,22,38,15,4,"Integratori"],
["Prozis Sport Protein Cookie",420,20,52,14,3,"Integratori"],
["Prozis Protein Cream Cacao",390,22,45,14,5,"Integratori"],
["Prozis Protein Cream Nocciola",395,22,44,15,5,"Integratori"],
["Prozis Protein Bread Mix",322,30,42,4,8,"Integratori"],
["Prozis Protein Yogurt",72,12,5,1,0,"Integratori"],
["Prozis Food Chicken (pollo cotto)",165,31,0,3.6,0,"Integratori"],
["Prozis Food Tuna (tonno)",104,24,0,1,0,"Integratori"],
["Prozis Omega 3 Premium",698,0,0,78,0,"Integratori"],
["Prozis CLA",890,0,0,99,0,"Integratori"],
["Prozis HMB",0,0,0,0,0,"Integratori"],
["Prozis Beta-Alanina",0,0,0,0,0,"Integratori"],
["Prozis Arginina AKG",0,0,0,0,0,"Integratori"],
["Prozis ZMA",0,0,0,0,0,"Integratori"],
["Prozis D-Aspartic Acid",0,0,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// MYPROTEIN — Linea estesa
// ═══════════════════════════════════════════════════════
["MyProtein Protein Pancake Mix Mirtilli",352,30,42,6,4,"Integratori"],
["MyProtein Protein Overnight Oats Cacao",368,24,50,6,5,"Integratori"],
["MyProtein Protein Porridge Vaniglia",362,24,49,6,5,"Integratori"],
["MyProtein Protein Cookie Cacao",432,18,55,14,4,"Integratori"],
["MyProtein Protein Brownie",398,20,48,14,4,"Integratori"],
["MyProtein Layered Protein Bar",408,22,48,14,3,"Integratori"],
["MyProtein Protein Crispy Bar",380,28,40,10,3,"Integratori"],
["MyProtein Protein Flapjack",388,20,52,12,4,"Integratori"],
["MyProtein THE Protein Bar",362,32,38,8,5,"Integratori"],
["MyProtein Protein Bites Cacao",438,32,42,14,3,"Integratori"],
["MyProtein Protein Spread Cacao",385,22,44,15,5,"Integratori"],
["MyProtein Protein Spread Nocciola",390,22,43,16,5,"Integratori"],
["MyProtein Alpha Men Multivitaminico",0,0,0,0,0,"Integratori"],
["MyProtein CLA",890,0,0,99,0,"Integratori"],
["MyProtein HMB",0,0,0,0,0,"Integratori"],
["MyProtein ZMA",0,0,0,0,0,"Integratori"],
["MyProtein Vitamina C",0,0,0,0,0,"Integratori"],
["MyProtein Vitamina B12",0,0,0,0,0,"Integratori"],
["MyProtein Ferro",0,0,0,0,0,"Integratori"],
["MyProtein Zinco",0,0,0,0,0,"Integratori"],
["MyProtein Magnesio Bisgliccinato",0,0,0,0,0,"Integratori"],
["MyProtein Protein Yogurt Fragola",85,13,6,1,0,"Integratori"],
["MyProtein Protein Milk Cacao",68,8,7,1.5,0,"Integratori"],
["MyProtein Clear Protein Drink",40,8,2,0.1,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// SCI-MX
// ═══════════════════════════════════════════════════════
["Sci-MX Ultra Whey Protein Cacao",382,78,6,6,1,"Integratori"],
["Sci-MX Whey Plus Isolate",362,84,3,2,0.5,"Integratori"],
["Sci-MX Diet Whey Complex",342,60,15,6,3,"Integratori"],
["Sci-MX BCAA",0,76,0,0,0,"Integratori"],
["Sci-MX Creatina",0,0,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// POWERBAR
// ═══════════════════════════════════════════════════════
["PowerBar ProteinPlus Bar Cacao",352,30,39,9,3,"Integratori"],
["PowerBar ProteinPlus Bar Vaniglia",350,30,38,9,3,"Integratori"],
["PowerBar Natural Energy Cereal Bar",355,6.5,62,8,4,"Integratori"],
["PowerBar Gel Energetico",95,0,22,0,0,"Integratori"],
["PowerBar Isomax Drink",38,0,9.5,0,0,"Integratori"],
["PowerBar Recovery Drink",165,8,31,1.5,0,"Integratori"],
["PowerBar 5Electrolytes Drink",22,0,5.5,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// SIS (SCIENCE IN SPORT)
// ═══════════════════════════════════════════════════════
["SIS REGO Rapid Recovery Cacao",162,23,22,2,2,"Integratori"],
["SIS REGO Rapid Recovery Vaniglia",160,23,22,2,2,"Integratori"],
["SIS Whey Protein Cacao",382,78,6,6,1,"Integratori"],
["SIS GO Energy Bar",345,6,65,8,3,"Integratori"],
["SIS GO Gel Energetico",88,0,22,0,0,"Integratori"],
["SIS GO Hydro Drink",25,0,6,0,0,"Integratori"],
["SIS Beta Fuel Gel",105,0,26,0,0,"Integratori"],
["SIS BCAA",0,76,0,0,0,"Integratori"],
["SIS Creatina",0,0,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// HIGH5
// ═══════════════════════════════════════════════════════
["High5 Protein Bar Cacao",348,24,38,9,4,"Integratori"],
["High5 Energy Bar",355,6,63,9,3,"Integratori"],
["High5 Energy Gel",90,0,22,0,0,"Integratori"],
["High5 IsoGel",60,0,14,0,0,"Integratori"],
["High5 Zero Drink Tablet",10,0,2,0,0,"Integratori"],
["High5 Protein Recovery",155,22,20,2,2,"Integratori"],

// ═══════════════════════════════════════════════════════
// MULTIPOWER
// ═══════════════════════════════════════════════════════
["Multipower 100% Whey Protein Cacao",385,78,6,7,1,"Integratori"],
["Multipower 100% Whey Protein Vaniglia",382,78,5.5,7,1,"Integratori"],
["Multipower Protein Bar",358,25,38,9,4,"Integratori"],
["Multipower BCAA",0,76,0,0,0,"Integratori"],
["Multipower Creatina",0,0,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// NUTRABOLICS
// ═══════════════════════════════════════════════════════
["Nutrabolics Whey Protein Cacao",382,78,6,6,1,"Integratori"],
["Nutrabolics Hydropure Isolate",358,87,1.5,1,0,"Integratori"],
["Nutrabolics Supernova (pre-workout)",30,3,4,0.5,0,"Integratori"],
["Nutrabolics Anabolic State BCAA",0,74,0,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// REFLEX NUTRITION
// ═══════════════════════════════════════════════════════
["Reflex Nutrition Instant Whey Cacao",380,78,6,5.5,1,"Integratori"],
["Reflex Nutrition Instant Whey Vaniglia",378,78,5.5,5.5,1,"Integratori"],
["Reflex Nutrition Native Whey",365,86,2,1.5,0.5,"Integratori"],
["Reflex Nutrition Micellar Casein",360,75,9,4,1,"Integratori"],
["Reflex Nutrition BCAA",0,76,0,0,0,"Integratori"],
["Reflex Nutrition Creatina",0,0,0,0,0,"Integratori"],
["Reflex Nutrition One Stop XTREME",388,34,55,5,3,"Integratori"],

// ═══════════════════════════════════════════════════════
// NUTRISPORT
// ═══════════════════════════════════════════════════════
["Nutrisport 90+ Protein Cacao",362,85,2,2,0.5,"Integratori"],
["Nutrisport 90+ Protein Vaniglia",360,85,1.5,2,0.5,"Integratori"],
["Nutrisport Whey Protein",382,78,6,6,1,"Integratori"],
["Nutrisport Recovery Bar",342,18,48,9,3,"Integratori"],
["Nutrisport Endurance Gel",90,0,22,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// PROTEINE ITALIA
// ═══════════════════════════════════════════════════════
["ProteineItalia Whey Protein Cacao",385,78,6,7,1,"Integratori"],
["ProteineItalia Whey Protein Vaniglia",382,78,5.5,7,1,"Integratori"],
["ProteineItalia Whey Isolate",362,84,3,2,0.5,"Integratori"],
["ProteineItalia Creatina",0,0,0,0,0,"Integratori"],
["ProteineItalia BCAA",0,76,0,0,0,"Integratori"],
["ProteineItalia L-Carnitina",16,0,4,0,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// BEVANDE PROTEICHE PRONTE (RTD)
// ═══════════════════════════════════════════════════════
["Protein Shake Müller pronto Cacao (330ml)",190,25,18,3,0,"Integratori"],
["Protein Shake Müller pronto Vaniglia (330ml)",185,25,17,3,0,"Integratori"],
["Optimum Nutrition Ready to Drink Cacao",160,20,13,3,0,"Integratori"],
["MyProtein Clear Protein RTD (500ml)",105,20,5,0.2,0,"Integratori"],
["Prozis Protein Shake RTD Cacao (330ml)",178,23,16,3,0,"Integratori"],
["Named Sport Protein Shake RTD (250ml)",138,20,10,2.5,0,"Integratori"],
["Alpro Protein Drink Soia (330ml)",85,8,7,2.5,0,"Integratori"],
["Danone Oikos Protein Drink (330ml)",168,24,15,1.5,0,"Integratori"],
["Premier Protein Shake Cacao (325ml)",160,30,5,3,0,"Integratori"],
["Fairlife Core Power Elite (414ml)",230,42,7,3.5,0,"Integratori"],
["Isopure Zero Carb RTD",125,26,0,1,0,"Integratori"],

// ═══════════════════════════════════════════════════════
// ALIMENTI PROTEICI & FUNCTIONAL FOOD
// ═══════════════════════════════════════════════════════
["Quark proteico 20%",120,14,4,5,0,"Latticini & Formaggi"],
["Fiocchi di latte (cottage) proteico",98,13,3.5,3.5,0,"Latticini & Formaggi"],
["Skyr proteico arricchito",66,12,4.5,0.2,0,"Latticini & Formaggi"],
["Uova albume liquido pastorizzato (Rondovero)",47,10,0.5,0.2,0,"Uova"],
["Albume d'uovo liquido (Just Whites)",47,10,0.5,0.2,0,"Uova"],
["Petto di pollo surgelato IQF",110,23,0,2.5,0,"Carne & Pollame"],
["Pollo arrosto al forno (pronto)",195,25,0,10,0,"Carne & Pollame"],
["Polpette di pollo (Findus)",188,15,10,9,1,"Carne & Pollame"],
["Burger di manzo 5% grassi",135,21,0,5.5,0,"Carne & Pollame"],
["Burger vegetale Beyond Meat",250,20,7,18,2,"Legumi"],
["Burger vegetale Impossible Meat",240,19,9,14,3,"Legumi"],
["Tofu affumicato",135,14,2,8,0.5,"Legumi"],
["Tofu vellutato (silken)",55,5,2,2.5,0,"Legumi"],
["Seitan",118,25,4,1.5,0.5,"Legumi"],
["Seitan al naturale",142,30,4,1.5,0.5,"Legumi"],
["Lupini al naturale",119,15,10,2.7,2.4,"Legumi"],
["Edamame surgelati sgusciati",122,11,8.9,5.2,5.2,"Legumi"],

// ═══════════════════════════════════════════════════════
// CEREALI & FARINE PROTEICHE
// ═══════════════════════════════════════════════════════
["Farina di avena integrale",369,12,62,7,8,"Cereali & Pane"],
["Farina di avena istantanea",376,13,64,7,8,"Cereali & Pane"],
["Farina di avena proteica (Prozis)",368,28,48,6,7,"Cereali & Pane"],
["Farina di cocco",400,6,44,25,38,"Cereali & Pane"],
["Farina di mandorle",576,21,10,50,10,"Cereali & Pane"],
["Farina di ceci",387,22,57,6.5,11,"Cereali & Pane"],
["Farina di lenticchie",352,25,55,2,12,"Cereali & Pane"],
["Farina di soia sgrassata",330,48,26,1.5,12,"Cereali & Pane"],
["Farina di riso integrale",363,7.5,77,2.5,4,"Cereali & Pane"],
["Crusca di avena",246,17,56,7,15,"Cereali & Pane"],
["Crusca di frumento",216,15,38,4.5,43,"Cereali & Pane"],
["Psyllium (fibre)",0,0,0,0,88,"Cereali & Pane"],
["Pane proteico (alto contenuto proteico)",245,20,28,6,5,"Cereali & Pane"],
["Pan di segale proteico",230,15,35,4,8,"Cereali & Pane"],
["Riso proteico MyProtein",355,12,78,1,1,"Cereali & Pane"],
["Pasta proteica Barilla Proteine+",365,18,63,3,4.5,"Cereali & Pane"],
["Pasta di lenticchie rosse (cotta)",130,10,20,0.8,4,"Cereali & Pane"],
["Pasta di ceci (cotta)",168,10,28,2,5,"Cereali & Pane"],
["Pasta di edamame (cotta)",155,13,19,3,5,"Cereali & Pane"],

// ═══════════════════════════════════════════════════════
// OLIO & GRASSI SANI
// ═══════════════════════════════════════════════════════
["Olio MCT (trigliceridi a catena media)",835,0,0,93,0,"Condimenti & Oli"],
["Olio di cocco biologico",862,0,0,100,0,"Condimenti & Oli"],
["Olio di semi di lino",884,0,0,100,0,"Condimenti & Oli"],
["Olio di canapa",900,0,0,100,0,"Condimenti & Oli"],
["Olio di avocado",884,0,0,100,0,"Condimenti & Oli"],
["Olio di sesamo",899,0,0,100,0,"Condimenti & Oli"],
["Ghee (burro chiarificato)",900,0.3,0,99.5,0,"Condimenti & Oli"],
["Pasta di arachidi 100%",589,25,20,49,6,"Condimenti & Oli"],
["Pasta di mandorle 100%",614,21,20,56,11,"Condimenti & Oli"],
["Pasta di anacardi 100%",553,18,30,44,3,"Condimenti & Oli"],
["Pasta di girasole",577,24,20,48,6,"Condimenti & Oli"],
["Cocco grattugiato (disidratato)",660,6.7,24,64,16,"Condimenti & Oli"],
["Latte di cocco intero (in lattina)",230,2.3,5.5,23,2.2,"Condimenti & Oli"],
["Latte di cocco leggero (in lattina)",95,1,3,9,1,"Condimenti & Oli"],

// ═══════════════════════════════════════════════════════
// DOLCIFICANTI & SOSTITUTI ZUCCHERO
// ═══════════════════════════════════════════════════════
["Eritritolo",0,0,0,0,0,"Condimenti & Oli"],
["Xilitolo",240,0,60,0,0,"Condimenti & Oli"],
["Stevia in polvere",0,0,0,0,0,"Condimenti & Oli"],
["Sciroppo di stevia",0,0,0,0,0,"Condimenti & Oli"],
["Zucchero di cocco",375,0,90,0,0,"Condimenti & Oli"],
["Sciroppo di agave",310,0,76,0,0,"Condimenti & Oli"],
["Miele di acacia",304,0.3,82.4,0,0.2,"Condimenti & Oli"],
["Miele millefiori",304,0.3,82,0,0.2,"Condimenti & Oli"],
["Stevia cristallina",0,0,0,0,0,"Condimenti & Oli"],
["Dolcificante Assugrin",0,0,0,0,0,"Condimenti & Oli"],
["Dolcificante Canderel",0,0,0,0,0,"Condimenti & Oli"],

// ═══════════════════════════════════════════════════════
// PRODOTTI SENZA GLUTINE
// ═══════════════════════════════════════════════════════
["Dr. Schär Pasta Senza Glutine (cotta)",130,3,27,0.5,1,"Cereali & Pane"],
["Dr. Schär Pane Bianco SG",250,4,50,3.5,2,"Cereali & Pane"],
["Dr. Schär Pane Integrale SG",230,4,44,3.5,4,"Cereali & Pane"],
["Dr. Schär Crackers SG",412,5.5,78,8,2,"Cereali & Pane"],
["Dr. Schär Fette Biscottate SG",375,5,78,4,2,"Cereali & Pane"],
["Schar Merendine SG",380,5,62,14,2,"Cereali & Pane"],
["Barilla Pasta Senza Glutine (cotta)",132,3,27,0.8,1,"Cereali & Pane"],
["Garofalo Pasta Senza Glutine",355,4,80,1.5,1,"Cereali & Pane"],
["Riso Scotti Pasta SG Riso (cotta)",130,2.5,28,0.5,0.5,"Cereali & Pane"],
["Nutrifree Pane SG",245,4,49,3.5,2,"Cereali & Pane"],

// ═══════════════════════════════════════════════════════
// PRODOTTI SENZA LATTOSIO
// ═══════════════════════════════════════════════════════
["Zymil Mozzarella SL",248,18,2.2,19,0,"Latticini & Formaggi"],
["Zymil Ricotta SL",138,11,4,9,0,"Latticini & Formaggi"],
["Zymil Panna SL",338,2.3,3.5,35,0,"Latticini & Formaggi"],
["Zymil Burro SL",758,0.5,0.6,84,0,"Latticini & Formaggi"],
["Lactoféia Yogurt SL Naturale",61,3.5,4.7,3.3,0,"Latticini & Formaggi"],
["Granarolo Formaggio Cremoso SL",252,6.5,3.5,23,0,"Latticini & Formaggi"],
["Mukki Yogurt SL Naturale",61,3.5,4.7,3.3,0,"Latticini & Formaggi"],

// ═══════════════════════════════════════════════════════
// SUPERMERCATI — Prodotti a marchio
// ═══════════════════════════════════════════════════════
["Esselunga Yogurt Greco 0%",57,10,4,0.1,0,"Yogurt"],
["Esselunga Yogurt Naturale Intero",61,3.5,4.7,3.3,0,"Yogurt"],
["Esselunga Petto di Pollo (pronto)",165,31,0,3.6,0,"Carne & Pollame"],
["Esselunga Bresaola",151,32,0.5,2,0,"Salumi & Affettati"],
["Lidl Milbona Yogurt Greco 0%",57,10,4,0.2,0,"Yogurt"],
["Lidl Milbona Skyr",63,11,4,0.2,0,"Yogurt"],
["Lidl Organic Whey Protein",382,78,6,7,1,"Integratori"],
["Aldi Yogurt Greco",57,10,4,0.2,0,"Yogurt"],
["Conad Yogurt Greco 0%",57,10,4,0.1,0,"Yogurt"],
["Carrefour Bio Yogurt Greco",58,10,4,0.2,0,"Yogurt"],
["Eurospin Yogurt Greco",56,10,4,0.2,0,"Yogurt"],
["Penny Market Yogurt Greco",56,10,4,0.2,0,"Yogurt"],

// ═══════════════════════════════════════════════════════
// PIATTI PRONTI PROTEICI
// ═══════════════════════════════════════════════════════
["Findus Bistecca di merluzzo",128,16,8,4,0.5,"Surgelati"],
["Findus Cotoletta di pollo",195,15,12,9,1,"Surgelati"],
["Bofrost Petto di pollo grigliato",165,31,0,3.6,0,"Surgelati"],
["Bofrost Filetti di salmone",208,20,0,14,0,"Surgelati"],
["Apetito Pollo al limone",175,22,5,7,0.5,"Surgelati"],
["Bonduelle Edamame surgelati",122,11,8.9,5.2,5.2,"Legumi"],
["Bonduelle Fave surgelate",72,6,9,0.5,5,"Legumi"],
["Valfrutta Fagioli Neri in scatola",132,8.9,24,0.5,8.7,"Legumi"],
["Valfrutta Edamame in scatola",122,11,8.9,5.2,5.2,"Legumi"],

// ═══════════════════════════════════════════════════════
// CREME SPALMABILI — Sezione dedicata
// ═══════════════════════════════════════════════════════
["Nutella (Ferrero)",543,6.3,57.9,30.9,3.4,"Creme Spalmabili"],
["Nutella B-Ready (barretta)",499,7.2,56,27,4,"Creme Spalmabili"],
["Nocciolata Rigoni di Asiago",526,6.5,56,32,3,"Creme Spalmabili"],
["Nocciolata Bianca Rigoni",561,5.5,59,35,1.5,"Creme Spalmabili"],
["Linea Dolce Conad crema nocciola",535,6,57,31,3,"Creme Spalmabili"],
["Crema Novi Nocciola",548,6.8,55,33,3.5,"Creme Spalmabili"],
["Crema Pan di Stelle (Mulino Bianco)",558,7.2,57,34,3.5,"Creme Spalmabili"],
["Crema Spalmabile Selex Nocciola",538,6.5,57,32,3,"Creme Spalmabili"],
["Crema Spalmabile Esselunga Nocciola",536,6.2,57,31.5,3,"Creme Spalmabili"],
["Crema Spalmabile Lidl Choco Nussa",540,6.5,57,32,3,"Creme Spalmabili"],
["Crema Spalmabile Conad Nocciola",535,6.3,57,31.5,3,"Creme Spalmabili"],
["Justin's Almond Butter Chocolate",572,12,44,38,4,"Creme Spalmabili"],
["Lotus Biscoff Spread (crema)",606,5.8,62,37,2.5,"Creme Spalmabili"],
["Lotus Biscoff Spread Crunchy",600,6,61,37,2.5,"Creme Spalmabili"],
["Philadelphia Cremoso Classico",228,6,3,22,0,"Creme Spalmabili"],
["Philadelphia alle Erbe",210,6.5,3.5,20,0,"Creme Spalmabili"],
["Philadelphia Milka",326,7.5,24,23,0.5,"Creme Spalmabili"],
["Robiola da spalmare",232,10,3.5,20,0,"Creme Spalmabili"],
["Crescenza spalmabile",209,12,1.5,17,0,"Creme Spalmabili"],
["Ricotta da spalmare (Galbani)",140,11,4,9,0,"Creme Spalmabili"],
["Burro di arachidi Whole Earth",606,27,13,50,7,"Creme Spalmabili"],
["Burro di arachidi Skippy",588,25,20,50,6,"Creme Spalmabili"],
["Burro di arachidi Prozis 100%",589,25,20,49,6,"Creme Spalmabili"],
["Burro di mandorle MyProtein",614,21,20,56,11,"Creme Spalmabili"],
["Tahini (crema di sesamo) bio",595,17,21,54,9,"Creme Spalmabili"],
["Crema di pistacchio 100%",620,20,18,55,6,"Creme Spalmabili"],
["Crema di nocciole 100% (senza zucchero)",670,15,17,61,9.7,"Creme Spalmabili"],
["Hummus classico",177,8,14,11,6,"Creme Spalmabili"],
["Hummus al peperoncino",180,8,14,11.5,5.5,"Creme Spalmabili"],
["Guacamole classico",152,2,8.5,14,3,"Creme Spalmabili"],
["Tzatziki",75,4.5,4,5,0.3,"Creme Spalmabili"],
["Pâté di olive nere",340,3,8,33,4,"Creme Spalmabili"],
["Pâté di tonno",198,20,2,13,0,"Creme Spalmabili"],
["Crema di carciofi",120,3.5,10,8,3,"Creme Spalmabili"],
["Crema di funghi porcini",145,4,8,11,2,"Creme Spalmabili"],
["Caviale di melanzane (baba ganoush)",85,2.5,8,5,2,"Creme Spalmabili"],
["Fegatini di pollo spalmabile",198,16,3,14,0,"Creme Spalmabili"],
["Crema di salmone affumicato",185,16,2,13,0,"Creme Spalmabili"],

// ═══════════════════════════════════════════════════════
// MARMELLATE, CONFETTURE & DOLCIFICANTI
// ═══════════════════════════════════════════════════════
["Confettura fragola Rigoni di Asiago (Fiordifrutta)",162,0.5,40,0,1.5,"Marmellate & Confetture"],
["Confettura albicocca Rigoni",158,0.5,39,0,1.5,"Marmellate & Confetture"],
["Confettura frutti di bosco Rigoni",160,0.5,40,0,1.5,"Marmellate & Confetture"],
["Marmellata di arance Zuegg",240,0.4,60,0.1,1,"Marmellate & Confetture"],
["Marmellata di fragole Zuegg",237,0.4,59,0.1,1,"Marmellate & Confetture"],
["Marmellata di albicocche Zuegg",240,0.4,60,0.1,0.8,"Marmellate & Confetture"],
["Confettura extra fragola Bonne Maman",248,0.4,62,0.1,1.2,"Marmellate & Confetture"],
["Confettura extra lamponi Bonne Maman",245,0.4,61,0.1,1.5,"Marmellate & Confetture"],
["Marmellata artigianale agrumi",255,0.4,63,0.2,0.8,"Marmellate & Confetture"],
["Confettura senza zucchero fragola",100,0.4,25,0.1,1.5,"Marmellate & Confetture"],
["Confettura senza zucchero albicocca",98,0.4,24,0.1,1.5,"Marmellate & Confetture"],
["Miele di acacia 100%",304,0.3,82,0,0,"Marmellate & Confetture"],
["Miele millefiori 100%",303,0.3,81,0,0,"Marmellate & Confetture"],
["Miele di castagno",306,0.5,83,0,0,"Marmellate & Confetture"],
["Sciroppo d'acero puro",260,0,67,0.1,0,"Marmellate & Confetture"],
["Crema di datteri (pasta)",282,1.8,71,0.4,6,"Marmellate & Confetture"],

// ═══════════════════════════════════════════════════════
// CIOCCOLATO — Linea completa
// ═══════════════════════════════════════════════════════
["Lindt Fondente 100% (Excellence)",556,12.5,24,47,17,"Dolci & Dessert"],
["Lindt Fondente 99%",557,12,24.5,47,16,"Dolci & Dessert"],
["Lindt Fondente 90%",560,10,26,47,12,"Dolci & Dessert"],
["Lindt Fondente 85%",564,9.8,21,48,11,"Dolci & Dessert"],
["Lindt Fondente 70%",546,8,33,43,10,"Dolci & Dessert"],
["Lindt Fondente 60%",527,8,36,43,7,"Dolci & Dessert"],
["Lindt al Latte Classico",534,8,57,32,0.5,"Dolci & Dessert"],
["Lindt al Latte Extra Cremoso",555,8.5,55,34,0.5,"Dolci & Dessert"],
["Lindt Bianco Classico",551,7.5,58,32,0,"Dolci & Dessert"],
["Lindt Hello Creamy Milk",538,8,55,33,0.5,"Dolci & Dessert"],
["Lindt Lindor Fondente (pezzo 12g)",64,0.8,5.3,4.7,0.9,"Dolci & Dessert"],
["Lindt Lindor Latte (pezzo 12g)",66,0.8,6,4.8,0.1,"Dolci & Dessert"],
["Perugina Fondente 75%",530,8.5,48,32,5,"Dolci & Dessert"],
["Perugina Fondente Nero Extra",525,8,50,32,5,"Dolci & Dessert"],
["Perugina Cioccolato al Latte",536,8.5,57.5,31.5,0.5,"Dolci & Dessert"],
["Perugina Baci Classico (pezzo 12g)",64,0.9,5.8,4.5,0.4,"Dolci & Dessert"],
["Ferrero Rocher (pezzo 12.5g)",73,0.9,6.2,5,0.6,"Dolci & Dessert"],
["Kinder Cioccolato (pezzo 12.5g)",69,0.9,7.4,3.9,0.1,"Dolci & Dessert"],
["Cioccolato fondente artigianale 70%",540,8,38,43,11,"Dolci & Dessert"],
["Cioccolato fondente artigianale 80%",552,9,32,46,12,"Dolci & Dessert"],
["Cioccolato al latte artigianale",535,8,57,32,0.5,"Dolci & Dessert"],
["Cioccolato bianco artigianale",539,6,59,32,0,"Dolci & Dessert"],
["Cioccolato Ruby (Callebaut)",528,6.5,52,32,0.3,"Dolci & Dessert"],
["Cioccolato al latte con nocciole",562,9,52,37,2,"Dolci & Dessert"],
["Cioccolato fondente con arancia",523,7.5,50,33,8,"Dolci & Dessert"],
["Cioccolato fondente con menta",515,7,51,32,7,"Dolci & Dessert"],
["Gianduiotto (pezzo 10g)",57,0.7,4.8,4,0.5,"Dolci & Dessert"],
["Cioccolata calda in tazza (200ml)",189,4.5,27,8,2,"Dolci & Dessert"],

// ═══════════════════════════════════════════════════════
// BISCOTTI & GALLETTE — Ampliato
// ═══════════════════════════════════════════════════════
["Oro Saiwa Classici",466,7.5,70,17,2,"Biscotti & Gallette"],
["Oro Saiwa Fibrattiva",415,8.5,65,14,8,"Biscotti & Gallette"],
["Oro Saiwa Integrali",422,8.5,67,15,6,"Biscotti & Gallette"],
["Mulino Bianco Misura Fibra Extra",368,8,60,10,14,"Biscotti & Gallette"],
["Mulino Bianco Misura Fette Biscottate",372,10,70,6,5,"Biscotti & Gallette"],
["Misura Fibra più biscotti",382,9,62,12,10,"Biscotti & Gallette"],
["Misura Controlline biscotti",378,8.5,68,10,5,"Biscotti & Gallette"],
["Misura Muesli biscotti",402,8,64,14,5,"Biscotti & Gallette"],
["Digestive McVitie's Original",471,7,62,20,3.5,"Biscotti & Gallette"],
["Digestive McVitie's Integrali",450,8,60,18,6,"Biscotti & Gallette"],
["Wasa Crispbread Sesamo",380,12,63,5,10,"Biscotti & Gallette"],
["Wasa Crispbread Integrale",345,11,64,2,16,"Biscotti & Gallette"],
["Wasa Fiber rye",289,12,50,2,22,"Biscotti & Gallette"],
["Wasa Delicate Rounds Multigrano",452,9,63,17,5,"Biscotti & Gallette"],
["Ryvita Crispbread Original",321,9.5,65,1.8,18,"Biscotti & Gallette"],
["Gallette di riso classiche",388,7,84,3,2,"Biscotti & Gallette"],
["Gallette di riso integrale",375,7,80,3,4,"Biscotti & Gallette"],
["Gallette di mais",379,8,81,2.5,2,"Biscotti & Gallette"],
["Gallette di farro",362,11,72,3,6,"Biscotti & Gallette"],
["Gallette riso e mais",382,7.5,82,3,2.5,"Biscotti & Gallette"],
["Cracker Ritz Classici",497,7.5,62,24,2,"Biscotti & Gallette"],
["Cracker Tuc Classici",486,7,62,22,2,"Biscotti & Gallette"],
["Cracker Salini Mulino Bianco",432,10.5,74,12,2.5,"Biscotti & Gallette"],
["Fette Biscottate classiche",385,10,78,3.5,3,"Biscotti & Gallette"],
["Fette Biscottate integrali",368,11,68,4.5,8,"Biscotti & Gallette"],
["Fette Biscottate senza glutine",375,4,82,4,2,"Biscotti & Gallette"],
["Biscotti Plasmon classici",415,10,72,11,2,"Biscotti & Gallette"],
["Pavesini classici",388,9.5,71,7.5,1.5,"Biscotti & Gallette"],
["Amaretti Lazzaroni",418,8,72,13,1.5,"Biscotti & Gallette"],
["Ricciarelli senesi",442,8,68,17,2,"Biscotti & Gallette"],
["Cantucci Toscani",450,10,68,17,2,"Biscotti & Gallette"],

// ═══════════════════════════════════════════════════════
// PIADINE, WRAPS & PRODOTTI DA FORNO
// ═══════════════════════════════════════════════════════
["Piadina Romagnola classica",295,9,47,9,2,"Cereali & Pane"],
["Piadina Romagnola integrale",270,10,42,9,5,"Cereali & Pane"],
["Piadina Romagnola senza glutine",288,3.5,55,6,2,"Cereali & Pane"],
["Piadina sottile (tipo Rimini)",310,9,49,10,2,"Cereali & Pane"],
["Piadina proteica Mulino Bianco",275,12,40,9,4,"Cereali & Pane"],
["Piadina Aldi/Lidl integrale",265,10,42,8,5,"Cereali & Pane"],
["Wrap di frumento classico",306,8.5,50,7,3,"Cereali & Pane"],
["Wrap integrale",288,9,46,7,5,"Cereali & Pane"],
["Wrap mais (tortilla)",237,5,49,3.5,5,"Cereali & Pane"],
["Tortilla di farina classica",295,7.5,49,7.5,2,"Cereali & Pane"],
["Focaccia genovese",310,8.5,45,11,2,"Cereali & Pane"],
["Focaccia al rosmarino",298,8,44,10,2,"Cereali & Pane"],
["Ciabatta",271,9.4,50,2.5,2.5,"Cereali & Pane"],
["Baguette",258,9,52,1.5,2.5,"Cereali & Pane"],
["Pane di Altamura DOP",303,11.5,63,2.5,3.5,"Cereali & Pane"],
["Pane di Matera IGP",298,10.5,62,2.5,3,"Cereali & Pane"],
["Grissini classici Torinesi",420,12,74,8.5,2.5,"Cereali & Pane"],
["Grissini integrali",405,12,70,8,5,"Cereali & Pane"],
["Tarallo classico pugliese",440,10,64,17,3,"Cereali & Pane"],
["Tarallo al pepe",438,10,63,17,3,"Cereali & Pane"],
["Pane carasau sardo",400,9,79,3,2.5,"Cereali & Pane"],
["Pane guttiau sardo",403,9.5,78,3.5,2.5,"Cereali & Pane"],

// ═══════════════════════════════════════════════════════
// PRODOTTI FRESCHI AGGIUNTIVI
// ═══════════════════════════════════════════════════════
["Bresaola Beretta IGP (val)",148,32,0.5,2,0,"Salumi & Affettati"],
["Bresaola Rigamonti (taglio fino)",150,32,0.5,2,0,"Salumi & Affettati"],
["Prosciutto cotto alta qualità AIA",107,17,1,3.5,0,"Salumi & Affettati"],
["Prosciutto crudo San Daniele DOP",256,28,0,16,0,"Salumi & Affettati"],
["Prosciutto di Parma DOP",248,26,0.5,16,0,"Salumi & Affettati"],
["Culatello di Zibello DOP",229,28,0,13,0,"Salumi & Affettati"],
["Mortadella Bologna IGP",318,14,1.5,29,0,"Salumi & Affettati"],
["Pancetta tesa affumicata",455,11,0,45,0,"Salumi & Affettati"],
["Guanciale",655,6,0.5,70,0,"Salumi & Affettati"],
["Lardo di Colonnata IGP",890,0.5,0,97,0,"Salumi & Affettati"],
["'Nduja di Spilinga",500,12,0,50,0,"Salumi & Affettati"],

// ═══════════════════════════════════════════════════════
// SUGHI, CONSERVE & CONDIMENTI
// ═══════════════════════════════════════════════════════
["Salsa di soia Kikkoman",60,10,5,0,0.1,"Sughi & Conserve"],
["Salsa di soia tamari senza glutine",62,10,5.5,0,0.1,"Sughi & Conserve"],
["Salsa Worcestershire",78,1,19,0.1,0,"Sughi & Conserve"],
["Salsa teriyaki",89,3,20,0.5,0,"Sughi & Conserve"],
["Salsa sriracha",35,1.5,6,0.5,0.5,"Sughi & Conserve"],
["Salsa tabasco",25,1,5,0.3,0,"Sughi & Conserve"],
["Salsa barbecue",166,1.5,40,0.5,0.3,"Sughi & Conserve"],
["Pesto genovese Saclà",480,5.5,3.5,49,2,"Sughi & Conserve"],
["Pesto rosso Saclà",295,5,10,27,2.5,"Sughi & Conserve"],
["Pesto genovese Barilla",385,5,4,39,2,"Sughi & Conserve"],
["Passata di pomodoro Mutti",38,2,6.5,0.2,1.5,"Sughi & Conserve"],
["Pomodori pelati Cirio",22,1.1,3.8,0.2,1,"Sughi & Conserve"],
["Concentrato di pomodoro Mutti",88,5,15,0.2,3,"Sughi & Conserve"],
["Acciughe sott'olio",204,20,0,14,0,"Sughi & Conserve"],
["Olive verdi denocciolate",145,1,3.8,15,2.9,"Sughi & Conserve"],
["Olive nere denocciolate",180,1.6,3.1,18,3,"Sughi & Conserve"],
["Capperi sotto sale (lavati)",23,2.4,1.5,0.9,3.2,"Sughi & Conserve"],
["Aceto balsamico di Modena IGP",88,0.5,17,0,0,"Sughi & Conserve"],
["Aceto di vino rosso",21,0,1,0,0,"Sughi & Conserve"],
["Maionese Calvé classica",670,1.5,2,74,0,"Sughi & Conserve"],
["Maionese Calvé light",275,1.3,8,26,0,"Sughi & Conserve"],
["Senape Calvé classica",66,4.4,5.8,4,2.8,"Sughi & Conserve"],
["Ketchup Heinz",110,1.5,26,0.1,0.8,"Sughi & Conserve"],

// ═══════════════════════════════════════════════════════
// VERDURE aggiuntive
// ═══════════════════════════════════════════════════════
["Avocado Hass maturo",160,2,8.5,15,6.7,"Verdure"],
["Edamame sbollentato",122,11,8.9,5.2,5.2,"Verdure"],
["Germogli di soia freschi",30,3.6,4.2,0.2,0.8,"Verdure"],
["Cavolo cappuccio rosso",31,1.5,5.5,0.2,2.5,"Verdure"],
["Cavolo di Bruxelles",43,3.4,6.5,0.5,3.8,"Verdure"],
["Broccoletti (cime di broccolo)",34,3,4,0.4,2.5,"Verdure"],
["Taccole (piselli mangiatutto)",42,3,7,0.4,2.6,"Verdure"],
["Okra (gombo)",33,1.9,7,0.2,3.2,"Verdure"],
["Ravanello",16,0.7,3.4,0.1,1.6,"Verdure"],
["Songino (valerianella)",21,2,3.5,0.4,1.8,"Verdure"],
["Cavolo rapa (kohlrabi)",27,1.7,6.2,0.1,3.6,"Verdure"],
["Zucchine trombette",15,1.2,2.3,0.2,1,"Verdure"],
["Melanzane viola",25,1.1,4.5,0.2,2.5,"Verdure"],
["Peperone giallo arrostito",45,1.2,10,0.3,1.5,"Verdure"],
["Pomodori datterini",20,1,3.8,0.2,1,"Verdure"],
["Pomodori San Marzano",18,0.9,3.6,0.2,1.2,"Verdure"],
["Cipollotto (cipolla verde)",32,1.8,7.3,0.2,2.6,"Verdure"],
["Scalogno",72,2.5,17.4,0.1,3.2,"Verdure"],
["Erba cipollina fresca",30,3.3,4.4,0.7,2.5,"Verdure"],
["Prezzemolo fresco",36,3,6.3,0.8,3.3,"Verdure"],
["Basilico fresco",23,3.2,1.1,0.6,1.6,"Verdure"],
["Menta fresca",70,3.7,14.9,0.9,8,"Verdure"],
["Zenzero fresco",80,1.8,17,0.8,2,"Verdure"],

// ═══════════════════════════════════════════════════════
// FRUTTA aggiuntiva
// ═══════════════════════════════════════════════════════
["Mela Golden",54,0.3,14,0.2,2.4,"Frutta"],
["Mela Granny Smith",52,0.4,12.8,0.2,2.8,"Frutta"],
["Mela Fuji",63,0.3,16,0.2,2.4,"Frutta"],
["Mela Pink Lady",60,0.3,15,0.2,2.2,"Frutta"],
["Pera Abate",55,0.4,13,0.1,3,"Frutta"],
["Pera Conference",58,0.4,14,0.1,3.2,"Frutta"],
["Uva Italia",67,0.6,17.2,0.4,0.9,"Frutta"],
["Clementine senza semi",47,0.9,11.5,0.2,1.7,"Frutta"],
["Pompelmo rosa",42,0.7,10.4,0.1,1.6,"Frutta"],
["Mandarino clementine",53,0.8,12,0.3,1.8,"Frutta"],
["Albicocche fresche",48,1.4,11,0.4,2,"Frutta"],
["Pesche tabacchiere",37,0.9,8.8,0.3,1.5,"Frutta"],
["Nettarine (pesche noci)",44,1.1,10.6,0.3,1.7,"Frutta"],
["Susine verdi",46,0.7,11,0.3,1.4,"Frutta"],
["Cachi Hachiya",70,0.6,18.6,0.4,3.6,"Frutta"],
["Melograno (arils)",83,1.7,18.7,1.2,4,"Frutta"],
["Fico fresco",74,0.8,19,0.3,3,"Frutta"],
["Lichi fresco",66,0.8,17,0.4,1.3,"Frutta"],
["Mango Alphonso",65,0.8,16.5,0.4,1.5,"Frutta"],
["Papaya fresca",43,0.5,11,0.3,1.8,"Frutta"],
["Maracuja (frutto della passione)",97,2.2,23.4,0.7,10.4,"Frutta"],
["Cocco fresco (polpa)",354,3.3,15.2,33.5,9,"Frutta"],

];

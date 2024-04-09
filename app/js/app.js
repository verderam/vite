var app= app || {}
app.settings={
	name: 'ViPS',
	ver:  null,
	nick: '100 seconds',
	slogan:'Villaggio Planning System',
	api:'/',
	url: null,
	reportUrl: 'http://report.villaggio.org/stampe/index.php',
	dbg:false,	
}
app.admins=[]
app.directors=[]
app.isAdmin=false
app.isDirector=false
app.oid = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))	//# genera ObjectID (ES6)
app.links=[]
app.anni=[
	{anno:'2017/2018'},
	{anno:'2018/2019'},
	{anno:'2019/2020'},
	{anno:'2020/2021'},
	{anno:'2021/2022'},
	{anno:'2022/2023'},
	{anno:'2017'},
	{anno:'2018'},
	{anno:'2019'},
	{anno:'2020'},
	{anno:'2021'},
	{anno:'2022'},
	{anno:'2023'},
	{anno:'2024'},
	{anno:'2025'}
]
app.anno='2022'
app.statiCorsi=['storico','test']
app.rapportiLavoro=['dipendente','consulente']
app.user=false
app.today=new Date()
app.editLimit=(moment(app.today).format('DD')>'05') ? moment(app.today).startOf('month').format('Y-MM-DD') : moment(app.today).subtract(7,'days').startOf('month').format('Y-MM-DD')
app.signal=function(prms={}){
	var o=this
	o.data=[]
	o.get=function(){
		return o.data
		o.trigger('_get',o.data)
	}
	o.set=function(data){
		o.data=data
		o.trigger('_set',o.data)		
	}
	o.del=function(){
		o.data=[]
		o.trigger('_del',o)		
	}
	riot.observable(o)
	o.on('get',o.get)
	o.on('set',o.set)
	o.on('del',o.del)
}
app.signals={
	corsi:new app.signal
}
app.obs=function(){
	var o = this
	riot.observable(o)
}
app.logout=function(){
	localStorage.clear()
	app.fn.goTo('login')
}
app.road=new app.obs
app.clipBoard=[]
app.fmt={}
app.fmt.str=function(v){
	return v
}
app.fmt.cur=function(v){
	if (isNaN(v)) v=0
	v=parseFloat(v)
	if (!v.toLocaleString) v=v||0
	v = v.toLocaleString('it-IT',{ style: 'currency',currency:'EUR' })
	return v
}
app.fmt.dec=function(v){
	v=parseFloat(v)
	if (!v.toLocaleString) v=v||0
	v = v.toLocaleString('it-IT',{minimumFractionDigits:2,maximumFractionDigits:2})
	return v
}
app.fmt.num=function(v){
	v=parseFloat(v)
	if (!v.toLocaleString) v=v||0
	v = v.toLocaleString('it-IT',{minimumFractionDigits:0,maximumFractionDigits:0})
	return v
}
app.fmt.month=function(v){
	var months=['GEN','FEB','MAR','APR','MAG','GIU','LUG','AGO','SET','OTT','NOV','DIC']
	v=parseInt(v)-1
	return months[v]
}
app.fmt.fullMonth=function(v){
	var months=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
	v=parseInt(v)-1
	return months[v]
}
app.fmt.wd=function(v){
	var days=['LUN','MAR','MER','GIO','VEN','SAB','DOM']
	v=parseInt(v)-1
	return days[v]
}
app.fmt.title= function(v) {
    v = v || ''
    return v.charAt(0).toUpperCase() + v.substring(1)
}
app.fmt.titleAll= function(v) {
    v = v || ''
    return v.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}
app.fmt.caps=function(v){
	return v && v.toUpperCase()
}
app.fmt.ao=function(v){
	v=v && v.toUpperCase()
	return (v=='F') ? 'a' : 'o'
}
app.fmt.date=function(v,iso){
	var fmt=(iso) ? 'YYYY-MM-DD' :'DD/MM/YYYY'
	if (!Date.parse(v)) return ''
	return (moment instanceof Function) ? moment(v).format(fmt) : new Date(v).toLocaleString()
}
app.fmt.weekDay=function(v){
	var fmt='ddd'
	if (!Date.parse(v)) return ''
	return (moment instanceof Function) ? moment(v).format(fmt) : new Date(v).toLocaleString()
}
app.fmt.shrtDate=function(v){
	var fmt='ddd D/M'
	if (!Date.parse(v)) return ''
	return (moment instanceof Function) ? moment(v).format(fmt) : new Date(v).toLocaleString()
}
app.fmt.year=function(v){
	var fmt='YYYY'
	if (!Date.parse(v)) return v
	return (moment instanceof Function) ? moment(v).format(fmt) : new Date(v).toLocaleString()
}
app.fmt.corso=function(v){
	var tbl=app.stores.corsi.data||[]
	var flt=function(r){
		return r.corsobreve==v
	}
	var filtered=tbl.filter(flt)
	//console.log(v,tbl,flt,filtered)
	return (filtered.length) ? filtered[0].corso : v
}
app.fmt.codiceCorso=function(v){
	var tbl=app.stores.corsi.data||[]
	var flt=function(r){
		return r.corsobreve==v
	}
	var filtered=tbl.filter(flt)
	//console.log(v,tbl,flt,filtered)
	return (filtered.length) ? filtered[0].codice : v
}
app.fmt.codiceeCorso=function(v){
	var tbl=app.stores.corsi.data||[]
	var flt=function(r){
		return r.corsobreve==v
	}
	var filtered=tbl.filter(flt)
	//console.log(v,tbl,flt,filtered)
	return (filtered.length) ? filtered[0].corso+' - '+filtered[0].codice : v
}
app.fmt.label=function(v){
	var tbl=app.stores.labels.data||[]
	var flt=function(r){
		return r.labelbreve==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].label : v
}
app.fmt.cono=function(v){
	var tbl=app.stores.rubrica.data||[]
	var flt=function(r){
		return r.username==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].cognome+' '+filtered[0].nome.substr(0,1)+'.' : v
}
app.fmt.nome=function(v){
	var tbl=app.stores.rubrica.data||[]
	var flt=function(r){
		return r.username==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].nome : v
}
app.fmt.cognome=function(v){
	var tbl=app.stores.rubrica.data||[]
	var flt=function(r){
		return r.username==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].cognome : v
}
app.fmt.persona=function(v){
	var tbl=app.stores.rubrica.data||[]
	var flt=function(r){
		return r.username==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].cognome+' '+filtered[0].nome : v
}
app.fmt.dipe=function(v){
	var tbl=app.stores.rubrica.data||[]
	var flt=function(r){
		return r.username==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].rapporto : 'n.a.'
}
app.fmt.dalle=function(v){
	var tbl=app.stores.ore.data||[]
	var flt=function(r){
		return r.ora==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].dalle : v
}
app.fmt.alle=function(v){
	var tbl=app.stores.ore.data||[]
	var flt=function(r){
		return r.ora==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].alle : v
}
app.fmt.disciplina=function(v){
	var tbl=app.stores.discipline.data||[]
	var flt=function(r){
		return r.disciplinabreve==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].disciplina : v
}
app.fmt.tipologia=function(v){
	var tbl=app.stores.tipologie.data||[]
	var flt=function(r){
		return r.tipologiabreve==v
	}
	var filtered=tbl.filter(flt)
	return (filtered.length) ? filtered[0].tipologia : v
}
app.fmt.data=function(v,tbl=[],key,display){
	var flt=function(r){
		return r[key]==v
	}
	var fltd=tbl.filter(flt)
	return (fltd.length) ? fltd[0][display]:v
}
app.fn={}
app.fn.notify=function(msg,code){
	//alert(msg)
	app.road.trigger('notify',msg)
}
app.fn.err=function(e){
	console.error('ERRORE ',e)
	msg =(e instanceof Object)? JSON.stringify(e) : e
	app.fn.notify(msg,'err')
	switch (true){
		case (e.code && e.code==401): 
			app.logout()
			break
		case (msg.search('disconnesso')>=0):
			app.logout()
			break
		case (msg.search('CONNECTION_REFUSED')>=0):
				app.logout()
				break
		case (msg.search('Timeout')>=0):
				app.logout()
				break	
		case (msg.search('{}')>=0):
			app.logout()
			break				
	}
	
}
app.fn.goTo=function(pg){
	route(pg)
}
app.fn.maximizeContainer=function(id){
	var marg=25
	var gc=document.getElementById(id)
	if (!gc) return
	return gc.parentNode.getBoundingClientRect().height-marg
	/*
	var t=gc.getBoundingClientRect().top
	var h = window.innerHeight
	if (h<200) h=200
	gc.style.height=h-t-20
	*/
}
app.socket = io(app.settings.url, {transports: ['websocket']})
app.f=feathers().configure(feathers.hooks()).configure(feathers.socketio(app.socket)).configure(feathers.authentication({storage:window.localStorage}))
app.s=app.f.services
app.db={}
app.db.store=function(prms){
	var o=this
	o.skip=0
	o.rows=200
	o.pg=1
	o.data=[]
	o.raw={}
	o.socket=app.socket
	o.tbl=prms.tbl || null
	o.act=prms.act || prms.tbl
	o.view=prms.view || false
	o.db=app.f.service(o.tbl) || false
	o.set=function(params){		
		if (!o.db) return
		o.data=params||{}
		if (o.data._id){
			o.db.update(o.data._id,o.data,function(err,rsp){
				if (err && o && o.trigger) o.trigger('error',err)
				o.trigger('saved',rsp)
			})			
		}else{
			o.db.create(o.data,function(err,rsp){
				if (err && o && o.trigger) o.trigger('error',err)
				o.trigger('saved',rsp)
			})
		}
	}
	o.create=o.set
	o.update=o.set
	o.put=o.set
	o.post=o.set
	o.find=function(params){ //multiple records
		o.db.find(params||{},function(err,data){
			if (err) o.trigger('error',err)
			o.raw=data
			o.data=o.raw.data||[]
			o.trigger('found',o.data)
		})
	}
	o.get=o.find	
	o.load=function(params){ //single record
		if (!o.db) return
		var id=params && params.id
		if (!id){
			o.data={}
			o.trigger('loaded',o.data)
		}else{
			o.db.get(id, function(err,data,msg){
				if (err) o.trigger('error',err)
				o.raw=data
				o.data=data.data|| {}
				o.trigger('loaded',o.data)
			})
		}
	}
	o.del=function(id){
		o.db.del(id, function(data){
			//console.log('deleted',data)
			o.trigger('removed',data)
		})
	}
	riot.observable(o)
	o.on('get',o.get)
	o.on('set',o.set)
	o.on('del',o.del)
	o.on('load',o.load)	
	o.db.on('created',function(data){o.trigger('created',data)})
	o.db.on('updated',o.trigger)
	o.db.on('removed',o.trigger)
}
app.db.rest=function(prms){
	var o=this
	o.skip=0
	o.rows=200
	o.pg=1
	o.data={}
	o.tbl=prms.tbl || null
	o.act=prms.act || prms.tbl
	o.view=prms.view || false
	o.db=app.s[o.tbl] || false
	o.set=function(params){
		if (!o.db) return
		o.data=params||{}
		if (o.data.id){
			o.db.put(o.data.id,o.data,function(data,error){
				if (error && o && o.trigger) o.trigger('error',error)
				o.trigger('saved',data)
			})			
		}else{
			o.db.post(o.data,function(data,error){
				if (error && o && o.trigger) o.trigger('error',error)
				o.trigger('saved',data)
			})
		}
	}
	o.post=function(data){
		if (!o.db) return
		o.data=data
		o.db.post(o.data,function(data,error){
			if (error && o && o.trigger) o.trigger('error',error)
			o && o.trigger && o.trigger('created',data,error)
		})
	}
	o.put=function(id,data){
		if (!o.db) return
		o.data=data
		o.db.put(id,o.data,function(data,error){
			if (error && o && o.trigger) o.trigger('error',error)
			o && o.trigger && o.trigger('saved',data,error)
		})
	}	
	o.get=function(params={}){
		if (!o.db) return
		o.db.get(params,function(data){
			o.data=data||[]
			o.trigger('loaded',data)
		})
	}
	o.load=function(params){
		if (!o.db) return
		var id=params.id
		if (!id){
			o.data={}
			o.trigger('loaded',o.data)
		}else{
			o.db.get(id, function(data,msg){
				o.data=data|| {}
				o.trigger('loaded',o.data)
			})
		}
	}
	o.del=function(id){
		o.db.del(id, function(data){
			//console.log('deleted',data)
			o.trigger('removed',data)
		})
	}
	riot.observable(o)
	o.on('get',o.get)
	o.on('set',o.set)
	o.on('del',o.del)
	o.on('load',o.load)	
}
app.stores={
	corsi:app.f.service('corsi'),
	discipline:app.f.service('discipline'),
	labels:app.f.service('labels'),
	ore:app.f.service('ore'),
	oraricorsi:app.f.service('oraricorsi'),
	orarigiorni:app.f.service('orarigiorni'),
	rubrica:app.f.service('rubrica'),
	tipologie:app.f.service('tipologie'),
	descrizioni:app.f.service('descrizioni'),
	cattedre:app.f.service('cattedre'),
	cattedreList:app.f.service('cattedre')
}
app.corsiLoad=function(){
	if (!app.user) return
	app.stores.corsi.find({query:{$limit:999,$sort:{'corsobreve':1}}}).then(function(rsp){
		app.stores.corsi.data=rsp && rsp.data || []
		app.road.trigger('corsi-loaded',rsp)
	})
}
app.disciplineLoad=function(){
	if (!app.user) return
	app.stores.discipline.find({query:{$limit:999,$sort:{'disciplinabreve':1}}}).then(function(rsp){
		app.stores.discipline.data=rsp && rsp.data || []
		app.road.trigger('discipline-loaded',rsp)
	})
}
app.tipologieLoad=function(){
	if (!app.user) return
	app.stores.tipologie.find({query:{$limit:999,$sort:{'tipologiabreve':1}}}).then(function(rsp){
		app.stores.tipologie.data=rsp && rsp.data || []
		app.road.trigger('tipologie-loaded',rsp)
	})
}
app.descrizioniLoad=function(){
	if (!app.user) return
	app.stores.descrizioni.find({query:{$limit:999,$sort:{'descrizione':1}}}).then(function(rsp){
		app.stores.descrizioni.data=rsp && rsp.data || []
		app.road.trigger('descrizioni-loaded',rsp)
	})
}
app.cattedreLoad=function(){
	if (!app.user) return
	app.stores.cattedre.find({query:{$limit:999,$sort:{'cattedra':1}}}).then(function(rsp){
		app.stores.cattedre.data=rsp && rsp.data || []
		app.stores.cattedreList.data=rsp && rsp.data || []
		app.road.trigger('cattedre-loaded',rsp)
	})
}
app.oreLoad=function(){
	//if (!app.user) return
	app.stores.ore.find({query:{$limit:999,$sort:{'ordine':1}}}).then(function(rsp){
		app.stores.ore.data=rsp && rsp.data || []
		app.road.trigger('ore-loaded',rsp)
	})
}
app.rubricaLoad=function(){
	if (!app.user) return
	app.stores.rubrica.find({query:{$limit:999,$sort:{'cognome':1,'nome':1}}}).then(function(rsp){
		app.stores.rubrica.data=rsp && rsp.data || []
		app.road.trigger('rubrica-loaded',rsp)
	})
}
app.labelsLoad=function(){
	if (!app.user) return
	app.stores.labels.find({query:{$limit:999,$sort:{'label':1}}}).then(function(rsp){
		app.stores.labels.data=rsp && rsp.data || []
		app.road.trigger('labels-loaded',rsp)
	})
}

app.pgs={}
app.pg=false
app.lists=['corsi','cattedre','discipline','tipologie','ore','rubrica','labels','descrizioni'] //# liste di uso comune (ad es. nelle combo)
app.initLists=function(){
	app.lists.map(function(l){
		app.road.on('load-'+l,app[l+'Load'])
		app[l+'Load']() //# precarica i dati in tutte le liste comuni
	})
}
app.initUser=function(data){
	//console.info('initUser called!',app.user)
	app.initLists()
	/* app.f.service('conf').get('username').then(data => app.username=data._id)	*/
	app.links=[
		{ name: "Orario docente", ico: "graduation-cap", url: "orario",  accessKey:false},
		{ name: "Reports", ico: "file-excel", url: "reports",  accessKey:false},
		{ name: "Statistiche", ico: "chart-bar", url: "statistiche",  accessKey:false}
	]
	app.f.service('conf').get('admins').then(
		data => {	 
			app.admins=data._id
			app.isAdmin=parseInt(app.admins.indexOf(app.user)+1)
			if (app.isAdmin){
				let adminMenu=[
					{ name: "Orari", ico: "calendar", url: "orari",  accessKey:"o"},  
					{ name: "Cattedre", ico: "table", url: "cattedre",  accessKey:false},
					//{ name: "Reports", ico: "file-excel", url: "reports",  accessKey:false},
					{ name: "Impostazioni", ico: "wrench", url: "impostazioni",  accessKey:false}
				]
				adminMenu.map(function(m){app.links.push(m)})				
				app.road.trigger('log-in')
				riot.update()					
			} else{
				app.f.service('conf').get('directors').then(
					data => {	 
						app.directors=data._id
						app.isDirector=parseInt(app.directors.indexOf(app.user)+1)
						if (app.isDirector){
							let mnu=[
								{name: "Orari", ico: "calendar", url: "orari",  accessKey:"o"}
							]
							mnu.map(function(m){app.links.push(m)})				
							app.road.trigger('log-in')
							riot.update()								
						}else{
							app.road.trigger('log-in')
							riot.update()	
						}
					}
				)
			}
			localStorage.setItem('user',app.user)
		} /// data (admins)
	)
}
app.init=function(){
	//Array.prototype.clone = function() {return this.slice(0)}
	/*
	Array.prototype.unique = function(){
		var n = {},r=[]
		for(var i = 0; i < this.length; i++){
			if (!n[this[i]]){
				n[this[i]] = true
				r.push(this[i])
			}
		}
		return r
	}
	*/
	app.f.service('conf').get('ver').then(data => app.settings.ver=data._id)
	app.f.service('conf').get('prefix').then(data => app.settings.prefix=data._id)
	app.f.service('conf').get('reportUrl').then(data => app.settings.reportUrl=data._id)
	app.f.service('conf').get('slogan').then(data => app.settings.slogan=data._id)
	app.f.service('conf').get('booking').then(data => app.settings.booking=data._id)	
	app.road.trigger('settings',app.settings)
	app.road.on('loggedIn',app.initUser)
	app.f.on('logout',app.logout)
	riot.compile(function() {
		riot.mount('*')
	})
	if (app.user) app.initUser()
}
app.init()

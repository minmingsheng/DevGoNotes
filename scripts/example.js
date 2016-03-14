// ****************************************************************************
// *                                    css                                   *
// ****************************************************************************
	var submitStyle = {
	 	width: '100%',
		background: "#cbebc8"
	}
	var h1={
		fontSize: "3.5em",
		fontWeight: "bold"
	}
// ****************************************************************************
// *                                  helper                                  *
// ****************************************************************************

function getDate(time){
	    var t = parseInt(time);
	    t = new Date(t).toLocaleString();
		console.log(t);
	    var num = t.split("").indexOf(",");
	    t = t.split("").splice(0,num).join("");
		console.log(t);
	    return t;
}
// 	****************************************************************************
// *                             view1 color                                   *
// ****************************************************************************


var View1 = React.createClass({
  render: function() {
    return (
      <div className="colorNotes page-content">
      	<div className="center sliding">Color Notes</div>
        <ColorForm />
        <ColorList />

      </div>
    );
  }
});

var ColorForm = React.createClass({
	addColor: function(e){
		e.preventDefault();
		var data = "color="+ e.target.querySelector("input[type=text]").value;
		console.info(data);
		$.ajax({
		     url: "addColor.php",
		     dataType: 'json',
		     type: 'POST',
		     data: data,
		     success: function(xhr) {
		       console.info(xhr);
		     }.bind(this),
		     error: function(xhr, status, err) {
		     	console.error(xhr);
		     }.bind(this)
		});
	},
	render:function(){
		return(
			<form className = "ColorForm" onSubmit = {this.addColor}>
				<input type="text" placeholder = "type the code" />
				<input type="submit" value="Post" />
			</form>
		)
	}
})

var ColorList = React.createClass({
	getInitialState: function() {
	   return {color: [
	   		
	   	]};
	 },
	loadColor: function(){
		$.ajax({
		  url: "readColor.php",
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.setState({color: data});
		    console.log(data);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},

	componentDidMount: function(){
		this.loadColor();
		setInterval(this.loadColor, this.props.pollInterval);
	},
	render: function(){
		var colorNode = this.state.color.map(function(c){
			var cc =  {background:c.ColorCode}
			return(
				<Color author="jason"  pollInterval= {2000} cc={cc} >{c.ColorCode}</ Color>
			)
		})
		return (
			<div className = "ColorList">
				{colorNode}
			</div>
		)
	}
})

var Color = React.createClass({
	delColor:function(e){
		var ColorCode = e.target.style.background;
		var data = "ColorCode="+e.target.textContent;
		console.log(data);

		var xhr = new XMLHttpRequest();
		xhr.open( 'POST', 'delColor.php' );
		xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
		xhr.send( data );
		xhr.onreadystatechange = function() {
		  // if everything worked out, then..
		  if( xhr.readyState == 4 && xhr.status == 200 ) {
		      console.log(xhr.responseText);
		  }
		}
	},
	udateColor: function(e){
		var data = e.target.textContent;
		console.info(data);
	},
	render: function(){
		var cc = this.props.cc
		return (
			<div className = "color" onMouseEnter={this.udateColor} onClick= {this.delColor} style={cc}>
					<p>{this.props.children}</p>
			</div>
		)
	}
})


// ****************************************************************************
// *                                   view2                                  *
// ****************************************************************************
var View2 = React.createClass({
  render: function() {
    return (
      <div className="fontNotes page">
      	<h1	>FontNotes</h1>
      	<FontForm ></FontForm >
      	<FontList/>
      </div>
    );
  }
});
var FontForm = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var name = e.target.children[1].value;
		e.target.children[1].value="";
		var address = e.target.children[3].value;
		address = e.target.children[3].value="";
		var notes = e.target.children[5].value;
		e.target.children[5].value="";
		console.info(name);
		console.info(address);
		console.info(notes);
		var data = "name="+name+"&address="+address+"&notes="+notes;
		console.info(data);
		$.ajax({
		     url: "addFont.php",
		     dataType: 'json',
		     type: 'POST',
		     data: data,
		     success: function(xhr) {
		       console.info(xhr);
		     }.bind(this),
		     error: function(xhr, status, err) {
		     	console.info(xhr);
		     }.bind(this)
		});
	},
	render:function(){
		var width= {
		  width: '100%',
		};

		return(
			<form className = "fontForm page-content"  onSubmit={this.handleSubmit} >
				<p>Font Name</p>
				<input type="text"  className ="name" style={width} placeholder="type the font.."/>
				<p>Web Address</p>
				<input type="text" className ="address"  style={width} placeholder="type the address.."/>
				<p>Notes</p>
				<input type="text" className ="notes"  style={width} placeholder="type the notes.."/>
				<input type="submit"  style={submitStyle} placeholder="type the font.."/>
			</form>
		);
	}
});
var FontList  = React.createClass({
	getInitialState: function() {
	  return {font:[]};
	},
	loadFont: function(){
		$.ajax({
		  url: "readFont.php",
		  dataType: 'json',
		  cache: true,
		  success: function(data) {
		  	// var d = data.data;
		    this.setState({font: data.data});
		    // console.info( data.data);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},

	componentDidMount: function(){
		this.loadFont();
		// console.info(this.state.font);
		setInterval(this.loadFont, this.props.pollInterval);
	},

	render: function(){
		var fontNode = this.state.font.map(function(f){
			return (<Font name = {f.FontName} note = {f.Notes}  Address = {f.WebAddress}/>)
		})
		return (
			<div className= "fontList" pollInterval = {1000}>
				{fontNode}
			</div>
		)

	}
});
var Font = React.createClass({
	handleclick: function(e){
		var data = "name="+e.target.textContent;
		console.info(data);
		$.ajax({
		     url: "delFont.php",
		     dataType: 'json',
		     type: 'POST',
		     data: data,
		     success: function(xhr) {
		       console.info(xhr);
		     }.bind(this),
		     error: function(xhr, status, err) {
		     	console.error(xhr);
		     }.bind(this)
		});
	},
	render:function(){
		var titleS = {
			background:"#516c97",
			textAlign:"center"
		};
		var copyS = {
			width:"100vw",
			display:"inline-block",
			padding:"10px",
			lineBreak:"auto"
		};

		return (
			<div >
				{/*<h5 style={titleS} ><b>Font Name</b></h5>*/}
				<h1 style={titleS} onClick={this.handleclick}>{this.props.name}</h1>
			{	
				 /*<h5  style={titleS}><b>Web Address</b></h5>
				 						// <p style={copyS}>{this.props.Address}</p>*/
			}
				{/*<h5  style={titleS}><b>Notes</b></h5>*/}
				<p style={copyS}>{this.props.note}</p>
			</div>
		)
	}
})
// ****************************************************************************
// *                                   view3                                  *
// ****************************************************************************
var View3 = React.createClass({
	getInitialState: function() {
	   return {article: [
	   		{ArticleName: "jason", Texts: '1abasndadadsadsadsda'},
	   		
	   	]};
	},
	getState: function(a){
		this.setState({article:a})

	},
	// rawMarkup: function() {
	//   var rawMarkup = marked(this.state.article.Texts.toString(), {sanitize: true});
	//   return { __html: rawMarkup };
	// },
  render: function() {
    return (
      <div className="page-content">
      	<Selection state = {this.state.article} getState={this.getState}/>
      	<Feeding title = {this.state.article.ArticleName} >
      		<span dangerouslySetInnerHTML={{ __html: this.state.article.Texts }} />
      	</Feeding>
      </div>
    );
  }
});
var Feeding = React.createClass({

	render:function(){
		return (
			<div>
				<h1 style={h1}>{this.props.title}</h1>
				<p>{this.props.children}</p>
			</div>
		)
	}
})
var Selection = React.createClass({
	getInitialState : function(){
		 return {
		 	article : [],
		 };
	},	
	handleclick: function(e){
		e.preventDefault();
		var data = e.target.children[0].value;
		var feed = this.state.article.filter(function(el){
			return el.ArticleName == data
		
		})
		var text = feed[0].Texts;
		console.info("e:", text);
		var article ={};
		article["ArticleName"]= data;
		article["Texts"]=	text
		this.props.getState(article);
	},
	loadArticle: function(){
		console.info("jason");
		$.ajax({
		  url: "readAticle.php",
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.setState({article: data.data});
		    console.info(data.data);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(xhr);
		  }.bind(this)
		});
	},
	componentDidMount: function(){
		this.loadArticle();		
	},
	render: function(){
		var width = {
			width:"100%"
		}
		var nodes = this.state.article.map(function(article){
			return(
				 <Option value={article.ArticleName}>{article.ArticleName}</Option>
			)
		})
		return(
			<form onSubmit = {this.handleclick}>
				<select style={width}>
				 	{nodes}
 				</select>
 				<input type="submit" value = 'Read' style={submitStyle}/>
			</form>
		)
	}
})

var Option = React.createClass({
	render: function(){
		return (
			<option value={this.props.value} >{this.props.children}</option>
		)
	}
})
// ****************************************************************************
// *                                   Home                                  *
// ****************************************************************************
var Home = React.createClass({
  render: function() {
    return (
      <div className ="page-content">
      	<Header greeting = "Good morning" name="Jason"></Header >
      	<Todo pollInterval={444}/>
      </div>
    );
  }
});

var Header = React.createClass({

	render: function(){
		var div = {
			height:"5em",
			width:"100%",
			background:"#b7d8d3",
			paddingTop:"2em",
			paddingLeft:"1em",
		};
		var p = {
			fontSize:"0.8em",
			fortWeight:"normal",
			color:"#131b45",
			marginTop: "0.4em"
		};
		var h3 = {
			fontSize:"1.2em",
			color:"#131b45"
		};
		return (
			<div style={div}>
				<h3 style={h3}>{this.props.greeting} {this.props.name}</h3>
				<p style={p}> what you need to do?</p>
			</div>
		)
	}
})
var Todo = React.createClass({
	getInitialState : function(){
		return {
	   		todo: []
		};
	},
	loadTodo : function(){
		console.log(this);
		$.ajax({
		  url: "readTodo.php",
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.setState({todo: data.data});
		    console.log(data);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},
	componentDidMount : function(){
		this.loadTodo();
		setInterval(this.loadTodo, this.props.pollInterval)
	},
				// <Todolist task= "do app design" time="today" style="checked" stylep="pline"></Todolist>
				// <Todolist  task= "do wep design" time="today"></Todolist>
				// <Todolist  task= "fuck" time="today"></Todolist>
				// <Todolist  task= "kiss" time="today"></Todolist>
				// <Todolist  task= "happy endinsadadssag" time="today"></Todolist>
	render: function(){
		// <Todolist task= "do app design" time="today" style="checked" stylep="pline"></Todolist>
		var fn = this.loadTodo;
		var todoList = this.state.todo.map(function(todo){
			var t = getDate(todo.time);
			return (<Todolist task= {todo.todo} time={t} loadTodo={fn}></Todolist>)
		});
		return (
			<ul>
				{todoList}
			</ul>
		)
	}
})

var Todolist = React.createClass({
	getInitialState : function(){
		return {
			edi: false,
			del: false,
		}
	},
	handleclick : function(e){
		var pox = e.clientX;
		if(pox < window.innerWidth/2){
			if(this.state.edi){
				/*does not work*/

				var tt = e.target.parentElement.parentElement.children[0];      
				tt.parentElement.querySelector(".edi").style.zIndex = -1;
				tt.parentElement.querySelector(".edi").style.transition = "all 33ms  ease";
				tt.style.webkitTransform = "translate(0px, 0)";              
				tt.style.msTransform = "translate(0px, 0)";              
				tt.style.transform = "translate(0px, 0)";              
				this.setState({edi: false});                

			}else{
				// console.info("edit");
				var tt = e.target.parentElement.parentElement.children[0];
				tt.style.webkitTransform = "translate(100px, 0)";
				tt.style.msTransform = "translate(100px, 0)";
				tt.style.transform = "translate(100px, 0)";
				console.info(tt.parentElement.querySelector(".edi"));
				tt.parentElement.querySelector(".edi").style.zIndex = 1;
				tt.parentElement.querySelector(".edi").style.transition = "all 1s 1s ease";

				this.setState({edi: true});
			}

		}else{
			console.info("del");
			console.info(e.target.parentElement);
			var tar = e.target.parentElement;
			console.info(tar.parentElement.children[1]);
			if(this.state.del){
				tar.style.webkitTransform = "translate(0px, 0)";
				tar.style.msTransform = "translate(0px, 0)";
				tar.style.transform = "translate(0px, 0)";
				tar.parentElement.children[2].style.zIndex = -1;
				tar.parentElement.children[2].style.transition = "all 33ms  ease";

				this.setState({del: false});
			}else{
				tar.style.webkitTransform = "translate(-100px, 0)";
				tar.style.msTransform = "translate(-100px, 0)";
				tar.style.transform = "translate(-100px, 0)";
				tar.parentElement.children[2].style.zIndex = 1;
				tar.parentElement.children[2].style.transition = "all 1s 1s ease";
				this.setState({del: true});
			}
			
		}
	},
	handleDel : function(e){
		e.stopPropagation();
		var t =e.target.parentElement.parentElement.querySelector('p').textContent;
		var data = "todo="+t;
		console.info(t);
		$.ajax({
		     url: "delTodo.php",
		     dataType: 'json',
		     type: 'POST',
		     data: data,
		     success: function(xhr) {
		       console.info(xhr);
		       this.props.loadTodo();
		     }.bind(this),
		     error: function(xhr, status, err) {
		     	console.info(xhr);
		     }.bind(this)
		});
		var tt = e.target;

		// console.info("from: ",e.parentElement);
	},
	handleEdi : function(e){
		var tt = e.target.parentElement.parentElement;
		var data = tt;
		var dataT = data.children[0].querySelector('p').textContent;
		var data = data.children[0].querySelector('p').textContent;
		data = "todot="+dataT;
		console.info(data);
		var div= document.createElement("div");
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.background = "#516e99";
		div.style.animation = "showup 400ms 1 cubic-bezier(.67,.4,.6,1.32)";
		div.style.position = "absolute";
		div.style.zIndex = "1000000";
		div.style.top = "0";
		var form = document.createElement("div");
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("placeholder", dataT);
		input.style.width = "70%";
		input.style.height = "45px";
		input.style.display = "block";
		input.style.border = "none";
		input.style.fontWeight = "normal";
		input.style.borderRadius = "3px";
		input.style.color = "#b7d8d3";
		input.style.background = "rgba(183, 216, 211, 0.3)";
		input.style.margin = "15em auto";
		input.style.marginBottom = "0";
		input.style.paddingLeft = "1em";
		var submit = document.createElement("div");
		submit.textContent = "OK";
		submit.setAttribute("type", "submit");
		submit.setAttribute("value", "save");
		submit.style.width = "74%";
		submit.style.height = "45px";
		submit.style.display = "block";
		submit.style.margin = "1em auto";
		submit.style.fontSize = "0.8em";
		submit.style.textAlign = "center";
		submit.style.background = "#b7d8d3";
		submit.style.color = "#516e99";
		submit.style.lineHeight = "45px";
		submit.style.border = "none";
		submit.style.borderRadius = "3px";
		submit.addEventListener("click", function(a){
			var v = input.value;
			var t = Date.now();
			// var t = new Date(t)
			console.info(v);
			console.info(t);
			data += "&todo="+v;
			data +="&time="+t;
			console.info(data);
			$.ajax({
			     url: "updateTodo.php",
			     dataType: 'json',
			     type: 'POST',
			     data: data,
			     success: function(xhr) {
			       console.info(xhr);
			       var li = document.querySelector(".edi").parentElement;
			       console.info(li);
			       li.style.webkitTransform="translate(0,0)";
			       li.style.msTransform="translate(0,0)";
			       li.style.transform="translate(0,0)";
			     }.bind(this),
			     error: function(xhr, status, err) {
			     	console.info(xhr);
			     }.bind(this)
			});
			div.remove();
		}, false)
		form.appendChild(input);
		form.appendChild(submit);
		div.appendChild(form);
		document.body.appendChild(div);
	},
	render: function(){
		return (
			<li className="todo">
				<div onClick ={this.handleclick}>
					<div>
						<div className = {this.props.style}></div>
					</div>
					<p className = {this.props.stylep}>{this.props.task}</p>
					<p>{this.props.time}</p>
				</div>
				<div className="edi"><p onClick = {this.handleEdi}>Edit</p></div>
				<div className="del"><p onClick = {this.handleDel}>Delete</p></div>
				
			</li>
		)
	}
})

// ****************************************************************************
// *                                  toobar                                  *
// ****************************************************************************
var Toobar = React.createClass({
	render: function(){
		var img = {
			width: "20px",
			height:"20px",
			marginTop:"0.5em",
			position:"relative"
		};
		var toolbar = {
			paddingTop:"0.1em",
			height:"3.6em",
			background:"#b7d8d3"
		};
		var addicon ={
			position:"absolute",
			width:"50px",
			height:"50px",
			borderRadius:"50%",
			background:"#b7d8d3",
			right:0,
			left:0,
			top:"-40%",
			margin:"auto",
			zIndex:"1000",
			border:"1px solid #516e99"

		};
		var plus = {
			width:"30px",
			height:"30px",
			color:"white",
			display:"block",
			margin: "10px auto",
		}
		return(
			<div className="toolbar tabbar tabbar-labels" style={toolbar}>
			  <div style={addicon} onClick={this.props.handlSend}>
			  	   <img style={plus} src="img/plus-08.png" alt="+"/>
			  </div>
			  <div className="toolbar-inner"  >
			    <a href="#home" className="tab-link active" onClick={this.props.handleClick}>
			     <img style={img} src  = "img/home-08.png" className="icon"/>
			      <span className="tabbar-label">Home</span>
			    </a>
			    <a href="#view-1" className="tab-link" onClick={this.props.handleClick}>
			      <img style={img} src  = "img/color-08.png" className="icon"/>
			      <span className="tabbar-label">Color</span>
			    </a>
			    <a href="#view-2" className="tab-link" onClick={this.props.handleClick}>
			       <img style={img} src  = "img/font-08.png" className="icon"/>
			      <span className="tabbar-label">Fonts</span>
			    </a>
			    <a href="#view-3" className="tab-link" onClick={this.props.handleClick}>
			        <img style={img} src  = "img/book-08.png" className="icon"/>
			      <span className="tabbar-label">Article</span>
			    </a>
			  </div>
			</div>
		)
	}
})
// ****************************************************************************
// *                                  navbar                                  *
// ****************************************************************************
var Navbar = React.createClass({
	render: function(){
		var navS = {
			background :'#516e99',
			borderBottom: "3px solid #e85037"
		};
		var center = {
			msTransform: "translate(-20px, 0)",
			webkitTransformt: "translate(-20px, 0)",
			transform: "translate(-20px, 0)"
		};
		return(	
			<div className="navbar" >
			  <div className="navbar-inner" style={navS}>
			    <div className="left">
			    	<img src="img/logo-01.svg" style={{widht:"20px", height:"20px"}} />
			    </div>
			    <div className="center" style={center}>
			    	<p>{this.props.children}</p>
			    </div>
			    <div className="right">
			    	<img src="img/hamburger-01.svg" style={{widht:"20px", height:"20px"}} />
			    </div>
			  </div>
			</div>
		)
	}
});


var View = React.createClass({
	getInitialState: function() {
	   return {
	   	view: "home",
		};
	},
	handleClick: function(e){
		var t = e.target.getAttribute("href").split("").splice(1,6).join("").replace("-",'');
		console.log(t);
		this.setState({view: t})
	},
	handlSendtodo:function(e){
		console.info("sasaas");
		var div= document.createElement("div");
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.background = "#516e99";
		div.style.animation = "showup 400ms 1 cubic-bezier(.67,.4,.6,1.32)";
		div.style.webkitAnimation = "showup 400ms 1 cubic-bezier(.67,.4,.6,1.32)";
		div.style.position = "absolute";
		div.style.zIndex = "1000000";
		div.style.top = "0";
		var form = document.createElement("div");
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("placeholder", "enter the thing need to do..");
		input.style.width = "70%";
		input.style.height = "45px";
		input.style.display = "block";
		input.style.border = "none";
		input.style.fontWeight = "normal";
		input.style.borderRadius = "3px";
		input.style.color = "#b7d8d3";
		input.style.background = "rgba(183, 216, 211, 0.3)";
		input.style.margin = "15em auto";
		input.style.marginBottom = "0";
		input.style.paddingLeft = "1em";
		var submit = document.createElement("div");
		submit.textContent = "OK";
		submit.setAttribute("type", "submit");
		submit.setAttribute("value", "save");
		submit.style.width = "74%";
		submit.style.height = "45px";
		submit.style.display = "block";
		submit.style.margin = "1em auto";
		submit.style.fontSize = "0.8em";
		submit.style.textAlign = "center";
		submit.style.background = "#b7d8d3";
		submit.style.color = "#516e99";
		submit.style.lineHeight = "45px";
		submit.style.border = "none";
		submit.style.borderRadius = "3px";
		submit.addEventListener("click", function(e){
			var v = input.value;
			var t = Date.now();
			// var t = new Date(t)
			console.info(v);
			console.info(t);
			var data = "todo="+v+"&time="+t;
			console.info(data);
			$.ajax({
			     url: "addTodo.php",
			     dataType: 'json',
			     type: 'POST',
			     data: data,
			     success: function(xhr) {
			       console.info(xhr);
			     }.bind(this),
			     error: function(xhr, status, err) {
			     	console.info(xhr);
			     }.bind(this)
			});
			div.remove();
		}, false)
		form.appendChild(input);
		form.appendChild(submit);
		div.appendChild(form);
		document.body.appendChild(div);

	},
	render: function(){
		if(this.state.view=="view1"){
			return(
				<div className='page navbar-fixed toolbar-fixed'>
					<Navbar>Color</Navbar>
					<View1 />
					<Toobar handleClick = {this.handleClick}/>
				</div>

			)
		}else if(this.state.view=="view2"){
			return(
				<div className='page navbar-fixed toolbar-fixed'>
					<Navbar>Fonts</Navbar>
					<View2 />
					<Toobar handleClick = {this.handleClick} />
				</div>

			)
		}else if(this.state.view=="view3"){
			return(
				<div className='page navbar-fixed toolbar-fixed'>
					<Navbar>Article</Navbar>
					<View3 />
					<Toobar handleClick = {this.handleClick}/>
				</div>

			)
		}else{
			return(
				/*home*/
				<div className='page'>
					<div className = "page navbar-fixed toolbar-fixed">
						<Navbar>Home</Navbar>
						<Home />
						<Toobar handleClick = {this.handleClick} handlSend = {this.handlSendtodo}/>
					</div>
				</div>

			)
		}
		
	}
})

// ****************************************************************************
// *                                  render                                  *
// ****************************************************************************


	ReactDOM.render(<View />,document.getElementById('view'));
	


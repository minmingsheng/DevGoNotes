var View1 = React.createClass({
  render: function() {
    return (
      <div className="colorNotes page">
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
		     	console.error(err);
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
		// setInterval(this.loadColor, this.props.pollInterval);
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
		var submitStyle = {
		 	width: '100%',
			background: "#cbebc8"
		}
		return(
			<form className = "fontForm"  onSubmit={this.handleSubmit} >
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
  render: function() {
    return (
      <div className="text page">
      	<h1	>Article</h1>
      </div>
    );
  }
});


// ****************************************************************************
// *                                   Home                                  *
// ****************************************************************************
var Home = React.createClass({
  render: function() {
    return (
      <div className="text page">
      	<h1	>Home</h1>
      </div>
    );
  }
});


// ****************************************************************************
// *                                  toobar                                  *
// ****************************************************************************
var Toobar = React.createClass({


	render: function(){
		

		return(
			<div className="toolbar tabbar tabbar-labels">
			  <div className="toolbar-inner">
			    <a href="#home" className="tab-link active" onClick={this.props.handleClick}>
			      <i className="icon tabbar-demo-icon-1"></i>
			      <span className="tabbar-label">Home</span>
			    </a>
			    <a href="#view-1" className="tab-link" onClick={this.props.handleClick}>
			      <i className="icon tabbar-demo-icon-1"></i>
			      <span className="tabbar-label">Color</span>
			    </a>
			    <a href="#view-2" className="tab-link" onClick={this.props.handleClick}>
			      <i className="icon tabbar-demo-icon-2"></i>
			      <span className="tabbar-label">Fonts</span>
			    </a>
			    <a href="#view-3" className="tab-link" onClick={this.props.handleClick}>
			      <i className="icon tabbar-demo-icon-3"></i>
			      <span className="tabbar-label">Article</span>
			    </a>
			  </div>
			</div>
		)
	}
})
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
	render: function(){
		if(this.state.view=="view1"){
			return(
				<div className='page'>
					<View1 />
					<Toobar handleClick = {this.handleClick}/>
				</div>

			)
		}else if(this.state.view=="view2"){
			return(
				<div className='page'>
					<View2 />
					<Toobar handleClick = {this.handleClick} />
				</div>

			)
		}else if(this.state.view=="view3"){
			return(
				<div className='page'>
					<View3 />
					<Toobar handleClick = {this.handleClick}/>
				</div>

			)
		}else{
			return(
				<div className='page'>
					<Home />
					<Toobar handleClick = {this.handleClick}/>
				</div>

			)
		}
		
	}
})

// ****************************************************************************
// *                                  render                                  *
// ****************************************************************************


	ReactDOM.render(<View />,document.getElementById('view'));
	


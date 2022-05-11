document.addEventListener("DOMContentLoaded", function(event) { 
    var startButton = document.getElementById('start');
    var Timer = document.getElementById('time');
    var colour = document.getElementById('colour');
    var begin = document.getElementById('begin');
    var stop  = document.getElementById('stop');
    var intWorkTime = 0;
    var convertedSeconds = 0;
    var seconds = 60;
    var secondsPassed = 0;
    var start;
    let colourX = 0;//Hue X for Colour
    let colourY = 0;//Hue Y for Colour
    
    var lighton = true;
     
        startButton.addEventListener('click', function(event){
        event.preventDefault();
        var workTime = document.getElementById('time').value;
        Timer.innerHTML = workTime;
        intWorkTime = 0;
        convertedSeconds = 0;
        seconds = 59;
        secondsPassed = 0;
    })
     
    begin.addEventListener('click', function(){
      var workTime = document.getElementById('time').value;
      intWorkTime = parseInt(workTime);
      startingTime = intWorkTime - 1;
      convertedSeconds = intWorkTime * 60;
      document.getElementById('time').disabled = true;
      colour.disabled = true;
      startButton.disabled = true;
      begin.disabled = true;
      lighton = true;
      light();
       start = setInterval(()=>{
          if(convertedSeconds > 0)
          {
            if(secondsPassed != 60)
            {      
            convertedSeconds--;
              if(seconds < 10)
              {
                Timer.innerHTML = startingTime + ':0' + seconds;
                seconds--;
                secondsPassed++;
              }
              else
              {
                Timer.innerHTML = startingTime + ':' + seconds;
                seconds--;
                secondsPassed++;
              }
            }
            else{
              convertedSeconds--;
              startingTime--;
              seconds = 59;
              Timer.innerHTML = startingTime + ':' + seconds;
              secondsPassed = 0;
              intWorkTime--;
            }
          }
          else
          {
            clearInterval(start);
           seconds = 59;
           secondsPassed = 0;
           lighton = false;
           light();
     
          }
     
     
      }, 1000)
    })
     

     
    stop.addEventListener('click', function(){
      clearInterval(start);
            document.getElementById('time').disabled = false;
            breakM.disabled = false;
            colour.disabled = false;
            startButton.disabled = false;
            begin.disabled = false;
            lighton = false;
            light();
    })
     
        //Dictionary of Hue Colours
        const xyHue = {
          red: "0.675, 0.322",
          yellow: "0.4325, 0.5007",
          green: "0.4091, 0.518",
          cyan: "0.2857, 0.2744",
          blue: "0.167 , 0.04",
          purple: "0.3826, 0.1597",
          pink: "0.3947,0.3114",
          white: "0.3227, 0.3290",
     
      };
      //Splits the Value to get X and Y 
      function splitXYHue(){
          switch(colour.value)//reads userInputted colour value
          {
              case "red":
                  this.splitXYHue = xyHue.red.split(",");
                  colourX = parseFloat(this.splitXYHue[0]);
                  colourY = parseFloat(this.splitXYHue[1]);
                  break;
     
              case "yellow":
                  this.splitXYHue = xyHue.yellow.split(",");
                  colourX = parseFloat(this.splitXYHue[0]);
                  colourY = parseFloat(this.splitXYHue[1]);
                  break;
     
              
              case "green":
                  this.splitXYHue = xyHue.green.split(",");
                  colourX = parseFloat(this.splitXYHue[0]);
                  colourY = parseFloat(this.splitXYHue[1]);
                  break;
     
              case "cyan":
                  this.splitXYHue = xyHue.cyan.split(",");
                  colourX = parseFloat(this.splitXYHue[0]);
                  colourY = parseFloat(this.splitXYHue[1]);
                  break;
     
              
              case "blue":
                  this.splitXYHue = xyHue.blue.split(",");
                  colourX = parseFloat(this.splitXYHue[0]);
                  colourY = parseFloat(this.splitXYHue[1]);
                  break;
     
              case "purple":
                  this.splitXYHue = xyHue.purple.split(",");
                  colourX = parseFloat(this.splitXYHue[0]);
                  colourY = parseFloat(this.splitXYHue[1]);
                  break;
     
              
              case "pink":
                  this.splitXYHue = xyHue.pink.split(",");
                  colourX = parseFloat(this.splitXYHue[0]);
                  colourY = parseFloat(this.splitXYHue[1]);
                  break;
     
              
          }
      }
      function light() {  
      splitXYHue();
      let light = {"on": lighton, "xy": [colourX, colourY],"bri": 255};
      $.ajax({
          type: "PUT",
          url: "http://10.208.61.74:5050/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/1/state",
          dataType: "json",
          data: JSON.stringify(light),
          success: function (data) {
              console.log(data);
          }
      });
      }
      });
var score = 0;
var bad = 0;
trust = false;
var UIController = (function(){
    var DOMStrings = {
        button : '.btn',
        start : '.start',
        enemy : '.enemy'
    };


    return{
        getDOM : function(){
            return DOMStrings;
        },

        changeText: function(){
            score+=1;
            document.querySelector(DOMStrings.start).textContent = `Your score is ${score}`;
        },

        setValues : function(){
            score = 0;
            bad = 0;

        },

        addStyle : function(){
            document.querySelector('.container').style.borderColor = "green";         
        },

        destroyStyle : function(){
            document.querySelector('.container').style.borderColor = "black";    
        },

        addBad : function(){
            document.querySelector('.container').style.borderColor = "Red";
        }
    }
})();

var Controller = (function(){
    var DOM = UIController.getDOM();
    var changePos = function(){
            do{
            UIController.addStyle();
            setTimeout(UIController.destroyStyle,250);
            var le = Math.floor(Math.random()*1000);
            var to = Math.floor(Math.random()*1000);
            }while(le>420 || to >260);
            //console.log(le);
            document.getElementById('ene').style.left = le + "px";
            document.getElementById('ene').style.top = to + "px";
            UIController.changeText();
            bad--;
            trust = true;
    }

    var loseText = function(min,sec){
        document.querySelector(DOM.start).textContent = `Your score is ${score} and Your Time is : ${min}:${sec}`;
    }



    return{
        init : function(){
            var startMin = new Date().getHours();
            var startSec = new Date().getSeconds();
            var newHTML = '<div class = "enemy" id ="ene"><img src="target.jpg" class="enemy"></div>';
            document.querySelector('.container').insertAdjacentHTML('afterbegin',newHTML);
            document.querySelector(DOM.enemy).addEventListener('click',function(){
                changePos();
            })
            document.querySelector('.container').addEventListener('click',function(){
                bad++;
                //console.log(prevBad);
                console.log(bad);
                if(!trust)
                {
                    UIController.addBad();
                    setTimeout(UIController.destroyStyle,250);
                }
                
                if(bad == 3){
                    var endMin = new Date().getHours();
                    var endSec = new Date().getSeconds();
                    var elem = document.getElementById("ene");
                    elem.parentNode.removeChild(elem);
                    loseText(endMin-startMin,endSec-startSec);
                }
                trust = false;
            });
        }
    }

})();


document.querySelector('.btn').addEventListener('click',function(){
    UIController.setValues();
    Controller.init();
});

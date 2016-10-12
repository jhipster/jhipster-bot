'user strict';

module.exports = {

    /**
     * Check if the number selected by the user is valid for the choices given to him
     * @param {integer} choiceNumber - the number of the choice selected by the user
     * @param {array} choices
     * @return boolean
     */
    isChoiceValid: function (choiceNumber, choices){
       if(!isNaN(choiceNumber)
           && choiceNumber <= choices.length
           && choiceNumber >= 1){
               return true;
       }
       return false;
    },

    isAppPackageValid : function(appPackage){
        if (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(appPackage))
            return true;
        return false;
    },

    isAppNameValid : function (appName){
        //TODO
        return true;
    }
};
/**
 * Created by knut on 14-11-19.
 */
var actors = {};
var actorKeys = [];
var messages = [];
var notes = [];
exports.addActor = function(id,name,description){
    //console.log('Adding actor: '+id);
    actors[id] = {name:name, description:description};
    actorKeys.push(id);
};

exports.addMessage = function(idFrom, idTo, message,  answer){
    //console.log('Adding message from='+idFrom+' to='+idTo+' message='+message+' answer='+answer);
    messages.push({from:idFrom, to:idTo, message:message, answer:answer});
};

exports.addSignal = function(idFrom, idTo, message,  messageType){
    //console.log('Adding message from='+idFrom+' to='+idTo+' message='+message+' answer='+answer);
    messages.push({from:idFrom, to:idTo, message:message, type:messageType});
};

exports.getMessages = function(){
    return messages;
};

exports.getActors = function(){
    return actors;
};
exports.getActor = function(id){
    return actors[id];
};
exports.getActorKeys = function(){
    return Object.keys(actors);
};

exports.clear = function(){
    actors = {};
    messages = [];
};

exports.LINETYPE = {
    SOLID       : 0,
    DOTTED      : 1,
    NOTE        : 2,
    SOLID_CROSS : 3,
    DOTTED_CROSS: 4,
    SOLID_OPEN  : 5,
    DOTTED_OPEN : 6,
    LOOP_START  : 10,
    LOOP_END    : 11,
    ALT_START   : 12,
    ALT_ELSE    : 13,
    ALT_END     : 14,
    OPT_START   : 15,
    OPT_END     : 16

};

exports.ARROWTYPE = {
    FILLED  : 0,
    OPEN    : 1
};

exports.PLACEMENT = {
    LEFTOF  : 0,
    RIGHTOF : 1,
    OVER    : 2
};

exports.addNote = function (actor, placement, message){
    var note = {actor:actor, placement: placement, message:message};

    notes.push(note);
    messages.push({from:actor, to:actor, message:message, type:exports.LINETYPE.NOTE, placement: placement});
};


exports.parseError = function(err, hash) {
    console.log('Syntax error:' + err);
};

exports.apply = function(param){
    if(param instanceof Array ){
        param.forEach(function(item){
            exports.apply(item);
        });
    } else {
        // console.log(param);
        switch(param.type){
            case 'addActor':
                exports.addActor(param.actor, param.actor, param.actor);
                break;
            case 'addNote':
                exports.addNote(param.actor,param.placement, param.text);
                break;
            case 'addMessage':
                exports.addSignal(param.from, param.to, param.msg, param.signalType);
                break;
            case 'loopStart':
                //console.log('Loop text: ',param.loopText);
                exports.addSignal(undefined, undefined, param.loopText, param.signalType);
                //yy.addSignal(undefined, undefined, $2, yy.LINETYPE.LOOP_START);
                break;
            case 'loopEnd':
                exports.addSignal(undefined, undefined, undefined, param.signalType);
                break;
            case 'optStart':
                //console.log('Loop text: ',param.loopText);
                exports.addSignal(undefined, undefined, param.optText, param.signalType);
                //yy.addSignal(undefined, undefined, $2, yy.LINETYPE.LOOP_START);
                break;
            case 'optEnd':
                exports.addSignal(undefined, undefined, undefined, param.signalType);
                break;
            case 'altStart':
                //console.log('Loop text: ',param.loopText);
                exports.addSignal(undefined, undefined, param.altText, param.signalType);
                //yy.addSignal(undefined, undefined, $2, yy.LINETYPE.LOOP_START);
                break;
            case 'else':
                exports.addSignal(undefined, undefined, param.altText, param.signalType);
                break;
            case 'altEnd':
                exports.addSignal(undefined, undefined, undefined, param.signalType);
                break;
        }

        // console.log('xxx',param);
    }
};
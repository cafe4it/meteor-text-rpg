MUD.Player = function(name, startRoom){
    this.mName = name;
    this.maxHp = undefined;
    this.mHp = undefined;
    this.mStrength = undefined;
    this.mDefence = undefined;
    this.mLocation = startRoom || undefined;
    this.mWeapon = undefined;
    this.mAmor = undefined;
    this.mLife = undefined;
}

MUD.Player.prototype.setHp = function(newHp){
    this.mHp = newHp;
}

MUD.Player.prototype.getHp = function(){
    return this.mHp;
}

MUD.Player.prototype.setStrength = function(newStrength){
    this.mStrength = newStrength;
}

MUD.Player.prototype.getStrength = function(){
    return this.mStrength;
}

MUD.Player.prototype.setDefence = function(newDefence){
    this.mDefence = newDefence;
}

MUD.Player.prototype.getDefence = function(){
    return this.mDefence;
}

MUD.Player.prototype.equip = function(itemName){

}

MUD.Player.prototype.attack = function(monterName){

}

MUD.Player.prototype.move = function(direction){}

MUD.Player.prototype.search = function(){}

MUD.Player.prototype.death = function(){}



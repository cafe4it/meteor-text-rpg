MUD.Monster = function(name, maxHp, strength, defence){
    this.mName = name || "";
    this.mMaxHp = maxHp || 0;
    this.mHp = this.mMaxHp;
    this.mStrength = strength || 0;
    this.mDefence = defence || 0;
    this.inCombat = false;
}
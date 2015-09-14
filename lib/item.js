MUD.Item = function(name, type, power, vitality, health){
    this.mName = name || "";
    this.mType = type ;
    this.mPower = power || 0;
    this.mVitality = vitality || 0;
    this.mHealth = health || 0;
    this.mAvailiable = true;
}
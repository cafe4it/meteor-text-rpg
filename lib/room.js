MUD.Room = function (name, description, item) {
    this.mName = name || "";
    this.mDescription = description || "";
    this.mItem = item || null;
    this.mNorth = null;
    this.mSouth = null;
    this.mEast = null;
    this.mWest = null;
    this.mMonsters = [];
}

MUD.Room.prototype.getMonsterRef = function(monsterName){
    return _.findWhere(this.mMonsters, {mName : monsterName});
}
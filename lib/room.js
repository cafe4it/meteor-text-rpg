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

MUD.Room.prototype.killMonster = function(monsterName){
    return false;
}

MUD.Room.prototype.searchResponse = function(){
    var response = '';
    if(this.mItem !== null && this.mItem.mAvailiable){
        response = 'Có một ' + this.mItem.mName + ' ở trong này.'
    }else{
        response = 'Sau khi tìm kiếm, không có gì ở trong này.'
    }

    if(this.mMonsters.length > 0){
        response += '\nCó một quái vật ở gần đó...';
        _.each(this.mMonsters, function(m){
            if(m.inCombat === false){
                response += '\nTấn công ' + m.mName;
            }
        })
    }

    return response;
}

MUD.Room.prototype.killMonster = function(monsterName){
    var flag = false;
    if(this.mMonsters.length > 0){
        var monster = _.findWhere(this.mMonsters, {mName : monsterName});
        if(monster){
            this.mMonsters = _.without(this.mMonsters, monster);
            flag = true;
        }
    }
    return flag;
}

MUD.Room.prototype.link = function(direction, room){
    var flag = false;
    switch(direction){
        case 'n':
        case 'N':
            this.mNorth = room;
            flag = true;
            break;
        case 's':
        case 'S':
            this.mSouth = room;
            flag = true;
            break;
        case 'w':
        case 'W':
            this.mWest = room;
            flag = true;
            break;
        case 'e':
        case 'E':
            this.mEast = room;
            flag = true;
            break;
    }
    return flag;
}

MUD.Room.prototype.itemTaken = function(){
    this.mItem.mAvailiable = false;
}
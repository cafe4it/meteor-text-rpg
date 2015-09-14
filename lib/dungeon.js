MUD.Dungeon = function(maxPlayers, maxRooms){
    this.mPlayers = [];
    this.mRooms = [];
    this.mMaxPlayers = maxPlayers;
    this.mMaxRooms = maxRooms;
}

MUD.Dungeon.prototype.isComplete = function(){
    return true;
}

MUD.Dungeon.prototype.addPlayer = function(newPlayer){
    this.mPlayers.push(newPlayer);
}

MUD.Dungeon.prototype.addRoom = function(newRoom){
    this.mRooms.push(newRoom);
}

MUD.Dungeon.prototype.removePlayer = function(playerName){}

MUD.Dungeon.prototype.generatePlayerStats = function(newPlayer){}

MUD.Dungeon.prototype.combatLoop = function(hero, villain){}

MUD.Dungeon.prototype.playerStatus = function(player){}

MUD.Dungeon.prototype.displayHelp = function(){}
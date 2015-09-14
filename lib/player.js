MUD.Player = function (name, startRoom) {
    this.mName = name;
    this.mMaxHp = 10;
    this.mHp = this.mMaxHp;
    this.mStrength = 1;
    this.mDefence = 0;
    this.mLocation = startRoom || null;
    this.mWeapon = null;
    this.mAmor = null;
    this.mLife = null;
}

MUD.Player.prototype.equip = function (itemName) {
    var response = '',
        item = this.mLocation.mItem;
    if (item && item.mName === itemName) {
        if ('VUKHI' === item.mType && item.mAvailiable) {
            this.mWeapon = item;
            this.mLocation.itemTaken();
            this.mStrength = this.mWeapon.mPower;
            response = 'Bạn đã trang bị ' + this.mWeapon.mName;
            return response;
        }
        else if ('AOGIAP' === item.mType && item.mAvailiable) {
            this.mAmor = item;
            this.mLocation.itemTaken();
            this.mDefence = this.mAmor.mVitality;
            this.mMaxHp += this.mAmor.mHealth;
            response = 'Bạn đã trang bị ' + this.mAmor.mName;
            return response;
        }
        else {
            this.mHp = this.mMaxHp;
            this.mLocation.itemTaken();
            response = 'Bạn đã hồi phục sức khoẻ';
            return response;
        }
    } else {
        if (item === null) return 'Không có đồ vật nào ở đây';
        response = 'Để được trang bị, bạn phải gõ đúng tên của vật phẩm';
        return response;
    }
}

MUD.Player.prototype.attack = function (monsterName) {
    var damage = 0;
    if (this.mLocation.mMonsters.length <= 0) {
        return 'Không có quái vật nào ở đây để chiến đấu'
    }

    var monster = _.findWhere(this.mLocation.mMonsters, {mName: monsterName});
    if (monster) {
        damage = this.mStrength - monster.mDefence;
        if (damage > 0) {
            return monster.mName + ' đã bị tiêu diệt - ' + damage + ' điểm';
        } else {
            return monster.mName + ' đã tránh được';
        }
    }else{
        return monsterName + ' không có ở đây'
    }
}

MUD.Player.prototype.move = function (direction) {
    var response = 'Bạn di chuyển',
        direction = direction.toUpperCase(),
        nothing_msg = 'Không có gì ở hướng này';
    switch (direction) {
        case 'N':
            if (this.mLocation.mNorth === null) {
                response = nothing_msg;
                break;
            }
            this.mLocation = this.mLocation.mNorth;
            response += ' về hướng Bắc\n' + this.mLocation.mDescription;
            break;

        case 'S':
            if (this.mLocation.mSouth === null) {
                response = nothing_msg;
                break;
            }
            this.mLocation = this.mLocation.mSouth;
            response += ' về hướng Nam\n' + this.mLocation.mDescription;
            break;
        case 'W':
            if (this.mLocation.mWest === null) {
                response = nothing_msg;
                break;
            }
            this.mLocation = this.mLocation.mWest;
            response += ' về hướng Tây\n' + this.mLocation.mDescription;
            break;
        case 'E':
            if (this.mLocation.mEast === null) {
                response = nothing_msg;
                break;
            }
            this.mLocation = this.mLocation.mEast;
            response += ' về hướng Đông\n' + this.mLocation.mDescription;
            break;
        default :
            response = 'Bạn đi đâu đấy?'
            break;
    }
    return response;
}

MUD.Player.prototype.search = function () {
    return this.mLocation.searchResponse();
}

MUD.Player.prototype.death = function () {
    return (this.mHp <= 0);
}



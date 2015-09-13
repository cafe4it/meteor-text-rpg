// Write your tests here!
// Here is an example.
Tinytest.add('Test Item', function (test) {
    var sword = new MUD.Item('kiếm','VUKHI',10, 0, 0);
    test.equal("kiếm",sword.mName, 'Item mới là kiếm');
    test.equal('VUKHI',sword.mType, 'Kiếm là vũ khí');
    test.equal(10, sword.mPower);
    test.equal(0, sword.mVitality);
    test.equal(0, sword.mHealth);
    test.equal(false, sword.mAvailiable);

    var another_sword = _.clone(sword);

    test.isTrue(another_sword !== sword);
});

Tinytest.add('Test monster', function(t){
    var monster = new MUD.Monster('rồng', 99, 100, 100);
    t.equal('rồng', monster.mName);
    t.equal(100, monster.mDefence);
    t.isTrue(monster.mHp === monster.mMaxHp);
});

Tinytest.add('Test room',function(t){
    var room_no_item = new MUD.Room('hang tối','1 hang trên núi cao');

    t.equal('hang tối', room_no_item.mName);
    t.equal('1 hang trên núi cao', room_no_item.mDescription);
    t.equal(null, room_no_item.mItem);
    t.equal(null, room_no_item.mNorth);
    t.equal(null, room_no_item.mSouth);
    t.equal(null, room_no_item.mEast);
    t.equal(null, room_no_item.mWest);

    var room_has_item = new MUD.Room('nhà sàn', 'nhà của dân tộc', new MUD.Item());

    t.equal('nhà sàn', room_has_item.mName);
    t.equal('nhà của dân tộc', room_has_item.mDescription);
    t.equal('', room_has_item.mItem.mName);
});

Tinytest.add('Room addMonster test',function(t){
    var monster = new MUD.Monster('monster',1,2,3),
        room_monster = new MUD.Room('room', 'room has monter');
    room_monster.mMonsters.push(monster);

    t.equal(monster, _.last(room_monster.mMonsters));
    t.isTrue(monster === room_monster.getMonsterRef('monster'));
    t.isTrue(undefined === room_monster.getMonsterRef('sheep'));
})
// Write your tests here!
// Here is an example.
Tinytest.add('Test Item', function (test) {
    var sword = new MUD.Item('kiếm', 'VUKHI', 10, 0, 0);
    test.equal("kiếm", sword.mName, 'Item mới là kiếm');
    test.equal('VUKHI', sword.mType, 'Kiếm là vũ khí');
    test.equal(10, sword.mPower);
    test.equal(0, sword.mVitality);
    test.equal(0, sword.mHealth);
    test.equal(true, sword.mAvailiable);

    var another_sword = _.clone(sword);

    test.isTrue(another_sword !== sword);
});

Tinytest.add('Test monster', function (t) {
    var monster = new MUD.Monster('rồng', 99, 100, 100);
    t.equal('rồng', monster.mName);
    t.equal(100, monster.mDefence);
    t.isTrue(monster.mHp === monster.mMaxHp);
});

Tinytest.add('Test room', function (t) {
    var room_no_item = new MUD.Room('hang tối', '1 hang trên núi cao');

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
    //test Room itemTaken test
    room_has_item.itemTaken();
    t.equal(false, room_has_item.mItem.mAvailiable);
});

Tinytest.add('Room addMonster test', function (t) {
    var monster = new MUD.Monster('monster', 1, 2, 3),
        room_monster = new MUD.Room('room', 'room has monter');
    room_monster.mMonsters.push(monster);

    t.equal(monster, _.last(room_monster.mMonsters));
    t.isTrue(monster === room_monster.getMonsterRef('monster'));
    t.isTrue(undefined === room_monster.getMonsterRef('sheep'));
    //test kill invalid monster
    t.equal(false, room_monster.killMonster('invalid name'));
    t.equal(true, room_monster.killMonster(monster.mName));
    t.equal(false, room_monster.killMonster(monster.mName));

});

Tinytest.add('Room searchResponse test', function (t) {
    var room_a = new MUD.Room('Căn nhà tối', '1 căn nhà hoang ở ven rừng', new MUD.Item('Áo mỏng', 'AOGIAO', 0, 20, 0)),
        response_a = 'Có một Áo mỏng ở trong này.';
    t.equal(response_a, room_a.searchResponse());

    var room_b = new MUD.Room('Căn nhà nhỏ', 'căn nhà nhỏ trên thảo nguyên'),
        response_b = 'Sau khi tìm kiếm, không có gì ở trong này.'

    t.equal(response_b, room_b.searchResponse(), 'Room nothing');

    // Possible game responses with monsters
    // c) "There is a Item.mName in this room.\nThere is a monster nearby...
    //  \nAttack the Monster.mName"
    // d) "After searching, you found nothing of value\nThere is a
    //  monster nearby...\nAttack the Monster.mName"

    var room_c = new MUD.Room('Hang tối', 'hang sâu trong rừng', new MUD.Item('Ỷ thiên kiếm', 'VUKHI', 1000, 200, 99999)),
        goblin = new MUD.Monster('Người lùn', 300, 50, 10),
        response_c = 'Có một Ỷ thiên kiếm ở trong này.\nCó một quái vật ở gần đó...\nTấn công Người lùn';
    room_c.mMonsters.push(goblin);

    t.equal(response_c, room_c.searchResponse());

    var room_d = new MUD.Room('Động nhỏ', 'động nhỏ dưới nước'),
        goblin = new MUD.Monster('Người lùn', 300, 50, 10),
        response_d = 'Sau khi tìm kiếm, không có gì ở trong này.\nCó một quái vật ở gần đó...\nTấn công Người lùn';
    room_d.mMonsters.push(goblin);

    t.equal(response_d, room_d.searchResponse());
});

Tinytest.add('Room link test', function (t) {
    var room_home = new MUD.Room('Nhà', 'Một căn nhà lớn'),
        north = new MUD.Room('Bể bơi', '1 bể bơi trong nhà'),
        south = new MUD.Room('Vườn', '1 khu vườn đẹp'),
        west = new MUD.Room('Phòng khách', 'phòng khác sang trọng'),
        east = new MUD.Room('Phòng tắm', 'phòng tắm có bể sục');

    //bad direction
    t.equal(false, room_home.link('z', north));
    //good direction
    t.equal(true, room_home.link('n', north));
    t.equal(true, room_home.link('s', south));
    t.equal(true, room_home.link('w', west));
    t.equal(true, room_home.link('e', east));
    // Verify links
    t.equal(north, room_home.mNorth);
    t.equal(south, room_home.mSouth);
    t.equal(west, room_home.mWest);
    t.equal(east, room_home.mEast);
});

Tinytest.add('Test Player', function (t) {

    // Player constructor w/o initial room
    var no_room_player = new MUD.Player('hero');

    t.equal(10, no_room_player.mMaxHp);
    t.equal(10, no_room_player.mHp);
    t.equal(1, no_room_player.mStrength);
    t.equal(0, no_room_player.mDefence);
    t.equal(null, no_room_player.mLocation);
    t.equal('hero', no_room_player.mName);
    t.equal(null, no_room_player.mWeapon);
    t.equal(null, no_room_player.mAmor);

    // Player constructor w/room

    var room_player = new MUD.Player('dude', new MUD.Room("Home", "A big house"));

    t.isTrue(null !== room_player.mLocation);

    // Player getters/setters
    var get_set = new MUD.Player('setter', new MUD.Room("Lake", "A clean lake"));

    get_set.mDefence = 1;
    get_set.mHp = 10;
    get_set.mName = 'getter';
    get_set.mStrength = 2;

    t.equal(1, get_set.mDefence);
    t.equal(10, get_set.mHp);
    t.equal('getter', get_set.mName);
    t.equal(2, get_set.mStrength);

    // Player equip test
    // The Item is not found
    // - There is no item within the room "There is no item to equip in this rooom"
    // - The player misspelled the item name "To equip an item you must type its full name correctly"
    var no_item_room = new MUD.Room("Itemless", "There is no item here"),
        no_item_player = new MUD.Player('Hi');
    no_item_player.mLocation = no_item_room;

    var response = 'Không có đồ vật nào ở đây';
    t.equal(response, no_item_player.equip('Bad Item Name'));

    var room_with_item = new MUD.Room("Item room", "Item filled room", new MUD.Item("Dao nhỏ", 'VUKHI', 10, 0, 0));

    no_item_player.mLocation = room_with_item;
    response = 'Để được trang bị, bạn phải gõ đúng tên của vật phẩm';
    t.equal(response, no_item_player.equip('Dao nho'));

    // Weapon is found
    // - The weapon becomes unavailable
    // - The players strength is set equal to the weapons power value
    // - The response returned is "You equipped the Item.mName"
    var item_player = new MUD.Player('Bye', room_with_item);
    response = 'Bạn đã trang bị Dao nhỏ';
    t.equal(response, item_player.equip('Dao nhỏ'));
    t.equal(false, room_with_item.mItem.mAvailiable);
    t.equal(room_with_item.mItem.mPower, item_player.mStrength);

    // Armor is found
    // - The armor becomes unavailable
    // - The players vitality is set equal to the armor's defence  // - The response returned is "You equipped the Item.mName"
    // - The armor's health value is added to the players max hp
    var steel_plate = new MUD.Item('Áo mỏng', 'AOGIAP', 0, 10, 20);
    room_with_item.mItem = steel_plate;
    response = 'Bạn đã trang bị Áo mỏng';

    t.equal(response, item_player.equip('Áo mỏng'));
    t.equal(room_with_item.mItem.mAvailiable, false);
    t.equal(steel_plate.mHealth + item_player.mHp, item_player.mMaxHp);
    t.equal(steel_plate.mVitality, item_player.mDefence);

    // Health is found
    // - The health item becomes unavailable
    // - The player's hp is fully restored
    // - The response is 'Bạn đã hồi phục sức khoẻ'

    var herb = new MUD.Item('Thuốc bổ', 'THUOC', 0, 0, 0);
    room_with_item.mItem = herb;
    response = 'Bạn đã hồi phục sức khoẻ';

    t.equal(response, item_player.equip('Thuốc bổ'));
    t.equal(room_with_item.mItem.mAvailiable, false);
    t.equal(item_player.mHp, item_player.mMaxHp);

    // Player attack test
    // a- There are no monsters within the Room then the method should
    // 		return "There are no monsters in this room to fight"
    // b- The player mis-typed the monster name then
    //		"The Monster.mName is not here"
    // c- If damage was dealt to the monster then the message should say
    //		"Monster.mName was dealt X damage"
    // d- If no damage was dealt to the monster then the message should say
    //		"Monster.mName dodged the attack"

    var response_a = 'Không có quái vật nào ở đây để chiến đấu',
        response_b = 'Quỷ biển không có ở đây',
        response_c = 'Quỷ lùn đã bị tiêu diệt - 30 điểm',
        response_d = 'Vua quỷ lùn đã tránh được';

    var cold_sword = new MUD.Item('Hàn băng kiếm', 'VUKHI', 30, 0, 0),
        arena = new MUD.Room('arena', 'A large crowd gathers', cold_sword),
        goblin = new MUD.Monster('Quỷ lùn', 50, 0, 0),
        attacker = new MUD.Player('Tiểu tử', arena);

    attacker.equip('Hàn băng kiếm');

    t.equal(response_a, attacker.attack('Quỷ lùn'));
    arena.mMonsters.push(goblin);
    t.equal(response_b, attacker.attack('Quỷ biển'));
    t.equal(response_c, attacker.attack('Quỷ lùn'));

    var super_goblin = new MUD.Monster('Vua quỷ lùn', 8, 0, 999);
    arena.mMonsters.push(super_goblin);
    t.equal(response_d, attacker.attack('Vua quỷ lùn'));

    // Player move test
    // - If the player moves in an invalid direction then
    // 		"You traveled nowhere" should be returned
    // - If the direction is valid but no room is connected
    //		"There is nothing in that direction"
    // - If the direction is valid and a room exist
    //		"You traveled directionname\nmLocation->getDescription()"

    var moving_room = new MUD.Room("Moving room", "You can move from here"),
        moving_north = new MUD.Room("Moving north", "North of the moving room"),
        moving_south = new MUD.Room("Moving south", "South of the moving room"),
        moving_west = new MUD.Room("Moving west", "West of the moving room"),
        moving_east = new MUD.Room("Moving east", "East of the moving room");

    var moving_player = new MUD.Player("Jill", moving_room);
    response = 'Bạn đi đâu đấy?';
    t.equal(response, moving_player.move('p'));

    response = 'Không có gì ở hướng này';
    t.equal(response, moving_player.move('n'));
    t.equal(response, moving_player.move('s'));
    t.equal(response, moving_player.move('w'));
    t.equal(response, moving_player.move('e'));

    moving_player.mLocation = moving_room;
    response = 'Bạn di chuyển về hướng Bắc\n' + moving_north.mDescription;
    moving_room.link('n', moving_north);
    t.equal(response, moving_player.move('n'));

    moving_player.mLocation = moving_room;
    response = 'Bạn di chuyển về hướng Nam\n' + moving_south.mDescription;
    moving_room.link('s', moving_south);
    t.equal(response, moving_player.move('s'));

    moving_player.mLocation = moving_room;
    response = 'Bạn di chuyển về hướng Tây\n' + moving_west.mDescription;
    moving_room.link('w', moving_west);
    t.equal(response, moving_player.move('w'));

    moving_player.mLocation = moving_room;
    response = 'Bạn di chuyển về hướng Đông\n' + moving_east.mDescription;
    moving_room.link('e', moving_east);
    t.equal(response, moving_player.move('e'));

    // Player search test
    // Exact same as the string Room::searchResponse( void )
    // method so it has already been tested

    // Player death test
    // -Returns true when the player's hp is less than zero
    // -Returns false when the player's hp is greater than zero

    var death_test = new MUD.Player('Dead guy');

    t.equal(false, death_test.death());
    death_test.mHp = -1;
    t.equal(true, death_test.death());
});

Tinytest.add('Dungeon test', function(t){
    var test_dungeon = new MUD.Dungeon(1,1);

    t.equal(1, test_dungeon.mMaxRooms);
    t.equal(1, test_dungeon.mMaxPlayers);
    t.equal(0, test_dungeon.mRooms.length);
    t.equal(0, test_dungeon.mPlayers.length);

    // - A dungeon without monsters is considered complete
    t.equal(true, test_dungeon.isComplete());

    // Dungeon addPlayer test
    // - Successful addition of a new player should display the following
    //		"The player named newPlayer->getName() entered the Dungeon"


})
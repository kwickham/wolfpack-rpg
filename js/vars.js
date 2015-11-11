/**
 * Variables from the wiki
 * Commands: https://docs.google.com/spreadsheets/d/1tSFuGwdTNScqBCwjdgWF5sc7i-SC0oj6zTPvXMYk0WM/edit
 * Dungeons: https://docs.google.com/spreadsheets/d/1kUrfVhMQmCmDTJZvsfihrjLvEhgJOGK5OoFEJPbltf0/edit
 */
var dungeons = {
        1: {
            name: "Ogre King's Lair",
            range: [2, 4],
            type: "dungeon",
            cost: 50,
        },
        2: {
            name: "Darkwolf Warrens",
            range: [3, 5],
            type: "dungeon",
            cost: 50,
        },
        3: {
            name: "Polar Fortress",
            range: [4, 6],
            type: "dungeon",
            cost: 50,
        },
        4: {
            name: "Thunder Mountain",
            range: [5, 7],
            type: "dungeon",
            cost: 60,
        },
        5: {
            name: "Jungle of Shadows",
            range: [6, 8],
            type: "dungeon",
            cost: 70,
        },
        6: {
            name: "Eldritch Lab",
            range: [7, 9],
            type: "dungeon",
            cost: 80,
        },
        7: {
            name: "Crypt of Iron",
            range: [8, 10],
            type: "dungeon",
            cost: 90,
        }
    },
    /**
     * Classes: https://docs.google.com/spreadsheets/d/1viw1ryle08K3b_sStnhyaqodv-fYHEYQU27yrXcJS9Q/edit
     */
    classes = {
        warrior: {
            name: 'Warrior',
            success: 10,
            wolfcoinBonus: 5,
            itemFind: 3,
            xpBonus: 0,
            identifier: 'C1',
            bonus: {}
        },
        mage: {
            name: 'Mage',
            success: 3,
            wolfcoinBonus: 0,
            itemFind: 10,
            xpBonus: 5,
            identifier: 'C2',
            bonus: {}
        },
        rogue: {
            name: 'Rogue',
            success: 0,
            wolfcoinBonus: 10,
            itemFind: 5,
            xpBonus: 3,
            identifier: 'C3',
            bonus: {}
        },
        ranger: {
            name: 'Ranger',
            success: 5,
            wolfcoinBonus: 3,
            itemFind: 3,
            xpBonus: 10,
            identifier: 'C4',
            bonus: {}
        },
        cleric: {
            name: 'Cleric',
            success: 3,
            wolfcoinBonus: 3,
            itemFind: 3,
            xpBonus: 3,
            identifier: 'C5',
            bonus: {
                1: '10% for party to avoid death'
            }
        }
    },
    /**
     * Probably not correct
     * Levels: http://wolfpack-rpg.wikia.com/wiki/Levels
     */
    levelRanges = {
        1: [0, 54],
        2: [55, 157],
        3: [158, 305],
        4: [306, 549],
        5: [550, 913],
        6: [914, 1421],
        7: [1422, 2097],
        8: [],
        9: [],
        10: [],
        11: [],
        12: [],
        13: [],
        14: [],
        15: [],
        16: [],
        17: [],
        18: [],
        19: [],
        20: [],
    };

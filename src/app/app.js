angular.module('ACSkillCalc',['ui.bootstrap','ngRoute','ngClipboard','LocalStorageModule'])
.config(function($routeProvider) {
	$routeProvider.when('/main',{
		templateUrl: './app/app.html'
	}).when('/load/:savefile',{
		templateUrl: './app/app.html'
	}).otherwise({
		redirectTo: '/main'
	});
})
.factory('SkillFactory',function() {
	var data = [
		['Alchemy',	'(C+F)/3',	'6',	'6',	'Unusable',	'429',	'401',	'0',	'Alchemy_Icon.png',	'Lets you prepare gem components, potions and oils.'],
		['Arcane Lore',	'F/3',	'Free',	'2',	'N/A',	'333',	'305',	'---',	'Arcane_Lore_Icon.png',	'Helps you learn how to use spells and magic items.'],
		['Armor Tinkering',	'(F+E)/2',	'4',	'AUG',	'Untrained',	'526',	'498',	'290',	'Armor_Tinkering_Icon.png',	'Lets you improve the properties of armor.'],
		['Assess Creature',	'(None)',	'4',	'2',	'Unusable',	'236',	'208',	'0',	'Assess_Creature_Icon.png',	'Helps you discern the attributes of creatures.'],
		['Assess Person',	'(None)',	'2',	'2',	'Unusable',	'236',	'208',	'0',	'Assess_Person_Icon.png',	'Helps you figure out human\'s attributes.'],
		['Cooking',	'(C+F)/3',	'4',	'4',	'Unusable',	'429',	'401',	'0',	'Cooking_Icon.png',	'Lets you make and modify foodstuffs.'],
		['Creature Enchantment',	'(F+W)/4',	'8',	'8',	'Unusable',	'381',	'353',	'0',	'Creature_Enchantment_Icon.png',	'Allows you to cast spells that affect creatures\' abilities.'],
		['Deception',	'(None)',	'4',	'2',	'Unusable',	'236',	'208',	'0',	'Deception_Icon.png',	'Helps prevent others from determining your attributes.'],
		['Dual Wield',	'C+C/3',	'2',	'2',	'Unusable',	'429',	'401',	'0',	'Dual_Wield_Icon.png',	'Allows you to equip any one handed weapon in your off hand (shield) slot.'],
		['Dirty Fighting',	'(S+C)/3',	'2',	'2',	'Unusable',	'429',	'401',	'0',	'Dirty_Fighting_Icon.png',	'Your melee and missile attacks have a chance to weaken your opponent. High attacks can reduce healing effects on and attack skills of the opponent. Low attacks can reduce the defense skills of the opponent. Medium attacks can cause small amounts of bleeding damage.'],
		['Finesse Weapons',	'(C+Q)/3',	'4',	'4',	'Untrained',	'429',	'401',	'193',	'Finesse_Weapons_Icon.png',	'Helps you wield finesse style melee weapons.'],
		['Fletching',	'(C+F)/3',	'4',	'4',	'Unusable',	'429',	'401',	'0',	'Fletching_Icon.png',	'Lets you make and modify arrows and quarrels.'],
		['Healing',	'(F+C)/3',	'6',	'4',	'Unusable',	'429',	'401',	'0',	'Healing_Icon.png',	'Helps you heal injuries.'],
		['Heavy Weapons',	'(S+C)/3',	'6',	'6',	'Untrained',	'429',	'401',	'193',	'Heavy_Weapons_Icon.png',	'Helps you wield heavy one handed melee weapons.'],
		['Item Enchantment',	'(F+W)/4',	'8',	'8',	'Unusable',	'381',	'353',	'0',	'Item_Enchantment_Icon.png',	'Allows you to cast spells that affect items\' properties.'],
		['Item Tinkering',	'(F+C)/2',	'2',	'AUG',	'Untrained',	'526',	'498',	'290',	'Item_Tinkering_Icon.png',	'Lets you improve many items (including weapons and armor) in certain basic ways.'],
		['Jump',	'(S+C)/2',	'Free',	'4',	'N/A',	'526',	'498',	'---',	'Jump_Icon.png',	'Helps you jump higher and fall further without taking damage.'],
		['Leadership',	'(None)',	'4',	'2',	'Untrained',	'236',	'208',	'0',	'Leadership_Icon.png',	'Affects the experience gained from your vassals.'],
		['Life Magic',	'(F+W)/4',	'12',	'8',	'Unusable',	'381',	'353',	'0',	'Life_Magic_Icon.png',	'Allows you to cast spells that heal and protect creatures.'],
		['Light Weapons',	'(S+C)/3',	'4',	'4',	'Untrained',	'429',	'401',	'193',	'Light_Weapons_Icon.png',	'Helps you wield light one handed melee weapons. Also helps you punch and kick.'],
		['Lockpick',	'(C+F)/3',	'6',	'4',	'Unusable',	'429',	'401',	'0',	'Lockpick_Icon.png',	'Lets you analyze locks and pick them open.'],
		['Loyalty',	'(None)',	'Free',	'2',	'N/A',	'236',	'208',	'---',	'Loyalty_Icon.png',	'Affects experience given to your patron in an allegiance.'],
		['Magic Defense',	'(F+W)/7',	'Free',	'12',	'N/A',	'319',	'291',	'---',	'Magic_Defense_Icon.png',	'Helps you resist magic from spells and magic items.'],
		['Magic Item Tinkering',	'F',	'4',	'AUG',	'Untrained',	'526',	'498',	'290',	'Magic_Item_Tinkering_Icon.png',	'Lets you add magical properties to weapons and armor.'],
		['Mana Conversion',	'(F+W)/6',	'6',	'6',	'Unusable',	'333',	'305',	'0',	'Mana_Conversion_Icon.png',	'Reduces the Mana consumed by spells and magic items.'],
		['Melee Defense',	'(Q+C)/3',	'10',	'10',	'Untrained',	'429',	'401',	'193',	'Melee_Defense_Icon.png',	'Helps you evade melee (hand-to-hand) attacks.'],
		['Missile Defense',	'(Q+C)/5',	'6',	'4',	'Untrained',	'352',	'324',	'116',	'Missile_Defense_Icon.png',	'Helps you avoid damage in missile (long-ranged) combat.'],
		['Missile Weapons',	'C/2',	'6',	'6',	'Untrained',	'381',	'353',	'145',	'Missile_Weapons_Icon.png',	'Helps you fire missile weapons such as bows, crossbows and thrown weapons.'],
		['Recklessness',	'(S+Q)/3',	'4',	'2',	'Unusable',	'429',	'401',	'0',	'Recklessness_Icon.png',	'Increases outgoing melee or missile non-critical damage, and incoming non-critical damage from all sources.'],
		['Run',	'Q',	'Free',	'4',	'N/A',	'526',	'498',	'---',	'Run_Icon.png',	'Helps you run faster and jump farther.'],
		['Salvaging',	'(None)',	'Free',	'AUG',	'N/A',	'236',	'208',	'---',	'Salvaging_Icon.png',	'Lets you salvage materials from loot items.'],
		['Shield',	'(S+C)/2',	'2',	'2',	'Untrained',	'526',	'498',	'290',	'Shield_Icon.png',	'Use the Shield skill to make full use of shields and magic reducing properties of shields.'],
		['Sneak Attack',	'(C+Q)/3',	'4',	'2',	'Unusable',	'429',	'401',	'0',	'Sneak_Attack_Icon.png',	'Your melee, missile, and magic attacks do more damage from behind. In addition, if you have Deception you have a chance to cause this extra Sneak Attack damage from the front.'],
		['Summoning',	'(E+W)/3',	'8',	'4',	'Unusable',	'429',	'401',	'0',	'Summoning_Icon.png',	'Allows you to summon creatures to attack your foes.'],
		['Two Handed Combat',	'(S+C)/3',	'8',	'8',	'Untrained',	'429',	'401',	'193',	'Two_Handed_Combat_Icon.png',	'Helps you wield all two handed weapons.'],
		['Void Magic',	'(F+W)/4',	'16',	'12',	'Unusable',	'381',	'353',	'0',	'Void_Magic_Icon.png',	'Allows you to cast offensive void ("Nether") spells: Nether Bolt (Spell), Nether Arc (Spell), Nether Streak (Spell), Nether Blast (Spell), Nether Ring (Spell), Damage Over Time Spells: Destructive Curse (Spell), Corrosion (Spell) and Corruption (Spell), and Weakening spells: Weakening Curse (Spell) and Festering Curse (Spell)'],
		['War Magic',	'(F+W)/4',	'16',	'12',	'Unusable',	'381',	'353',	'0',	'War_Magic_Icon.png',	'Allows you to cast offensive war spells that arc, ring, wall, bolt, volley, and blast.'],
		['Weapon Tinkering',	'(F+S)/2',	'4',	'AUG',	'Untrained',	'526',	'498',	'290',	'Weapon_Tinkering_Icon.png',	'Lets you improve the properties of weapons.']
	];
	
	var skills = [];
	
	for(i=0;i<data.length;i++) {
		skill = {
			"name":data[i][0],
			"formula":data[i][1],
			"trainCost":data[i][2],
			"specializeCost":data[i][3],
			"preTrainStatus":data[i][4],
			"maxBaseSpecialized":data[i][5],
			"maxBaseTrained":data[i][6],
			"maxBaseUntrained":data[i][7],
			"icon":data[i][8],
			"description":data[i][9],
			"trainedLevel":0
		};
		
		skill.isFree = function() {
			return this.trainCost === "Free";
		};
		
		skill.isAugmentation = function() {
			return this.specializeCost === "AUG";
		};
		
		skill.isTrained = function() {
			return this.trainedLevel === 1;
		};
		
		skill.isSpecialized = function() {
			return this.trainedLevel === 2;
		};
		
		skill.isUntrained = function() {
			return !this.isTrained() && !this.isSpecialized();
		};
		
		skill.canSpecialize = function() {
			return true;
		};
		
		skill.canTrain = function() {
			return this.isUntrained();
		};
		
		skill.canUntrain = function() {
			return !this.isFree() && this.isTrained();
		};
		
		skill.canUnspecialize = function() {
			return this.isSpecialized();
		};
		
		skill.specialize = function() {
			this.trainedLevel = 2;
		};
		
		skill.train = function() {
			this.trainedLevel = 1;
		};
		
		skill.untrain = function() {
			this.trainedLevel = 0;
		};
		
		skill.unspecialize = function() {
			this.train();
		};
		
		skill.getInvestedPoints = function() {
			var points = 0;
			if(this.isTrained()) {
				if(!this.isFree()) {
					points = points + parseInt(this.trainCost,10);
				}
			}
			if(this.isSpecialized()) {
				if(!this.isAugmentation()) {
					points = points + parseInt(this.specializeCost,10);
				}
				if(!this.isFree()) {
					points = points + parseInt(this.trainCost,10);
				}
			}
			return points;
		};
		
		skill.getSpecializeCurrency = function() {
			return this.isAugmentation() ? "" : "Skill Credits";
		};
		
		if(skill.isFree()) {
			skill.train();
		}
		
		skills.push(skill);
	}
	
	var factory = {};
	
	factory.getSkills = function() {
		return skills;
	};

	return factory;
})
.factory('CharacterFactory',['SkillFactory',function(SkillFactory) {
	var credits = [0,2,3,4,5,6,7,8,9,10,12,14,16,18,20,23,26,29,32,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,140,150,160,180,200,225,250,275];
	
	character = {
		"skills":SkillFactory.getSkills(),
		"level":1,
		"unlocks":[
			{"name":"Aun Ralirea Quest"	,"unlocked":false},
			{"name":"Oswald Quest"		,"unlocked":false},
			{"name":"Luminance Unlock 1","unlocked":false},
			{"name":"Luminance Unlock 2","unlocked":false}
		]
	};
	
	character.getMaximumSkillPoints = function() {
		var c = 0;
		$.each(credits, function(i, v) {
			if (v > character.level) {
				return false;
			}
			c = i;
		});
		var u = 0;
		for(i=0;i<character.unlocks.length;i++) {
			if(character.unlocks[i].unlocked) {
				u++;
			}
		}
		return 52 + c + u;
	};
	
	character.getInvestedSkillPoints = function(trainedLevel) {
		var invested = 0;
		for(i=0;i<this.skills.length;i++) {
			if(this.skills[i].trainedLevel === trainedLevel) {
				invested = invested + this.skills[i].getInvestedPoints();
			}
		}
		return invested;
	};
	
	character.getInvestedAugmentations = function() {
		var invested = 0;
		for(i=0;i<this.skills.length;i++) {
			var s = this.skills[i];
			if (this.skills[i].isAugmentation() && this.skills[i].isSpecialized()) {
				invested++;
			}
		}
		return invested;
	};
	
	character.getRemainingSkillPoints = function() {
		return this.getMaximumSkillPoints() - this.getInvestedSkillPoints(1) - this.getInvestedSkillPoints(2);
	};
	
	character.canPurchaseUpgrade = function(skill) {
		var c = 0;
		if(skill.isTrained() && skill.canSpecialize() && !skill.isAugmentation()) {
			c = parseInt(skill.specializeCost,10);
		} else if(skill.isUntrained() && skill.canTrain()) {
			c = parseInt(skill.trainCost,10);
		}
		return this.getRemainingSkillPoints() - c >= 0;
	};
	
	character.maximize = function () {
		this.level = 275;
		for(i=0;i<this.unlocks.length;i++) {
			this.unlocks[i].unlocked = true;
		}
	};
	
	character.resetSkills = function() {
		for(i=0;i<this.skills.length;i++) {
			var s = this.skills[i];
			if(s.canUnspecialize()) {
				s.unspecialize();
			}
			if(s.canUntrain()) {
				s.untrain();
			}
		}
	};
	
	character.resetAll = function() {
		this.level = 1;
		for(i=0;i<this.unlocks.length;i++) {
			this.unlocks[i].unlocked = false;
		}
		this.resetSkills();
	};
	
	character.serialize = function() {
		savefile = {
			level: this.level,
			skills:[],
			unlocks:[]
		};
		for(i=0;i<this.skills.length;i++) {
			savefile.skills[i] = this.skills[i].trainedLevel;
		}
		for(i=0;i<this.unlocks.length;i++) {
			savefile.unlocks[i] = this.unlocks[i].unlocked;
		}
		return btoa(JSON.stringify(savefile));
	};
	
	character.deserialize = function(string) {
		var savefile = JSON.parse(atob(string));
		this.level = savefile.level;
		for(i=0;i<savefile.unlocks.length;i++) {
			this.unlocks[i].unlocked = savefile.unlocks[i];
		}
		for(i=0;i<savefile.skills.length;i++) {
			this.skills[i].trainedLevel = savefile.skills[i];
		}
	};
	
	factory = {};
	
	factory.getCharacter = function() {
		return character;
	};
	
	return factory;
}])
.controller('AppController',['$scope', '$routeParams', '$modal', 'localStorageService', 'CharacterFactory', function($scope, $routeParams, $modal, localStorageService, CharacterFactory) {
	$scope.app = {
		name: "Asheron's Call Character Planner",
		url: "http://asheron.mudzereli.com/index.html#",
		versions:[
			{
				"name":"1.4.0",
				"date":"06-17-2014",
				"desc":"Build name editing and skill descriptions"
			},
			{
				"name":"1.3.0",
				"date":"06-17-2014",
				"desc":"Add form validation to character panel"
			},
			{
				"name":"1.2.1",
				"date":"06-15-2014",
				"desc":"Fix undefined copy links"
			},
			{
				"name":"1.2.0",
				"date":"06-15-2014",
				"desc":"Saved builds now persist through sessions"
			},
			{
				"name":"1.1.0",
				"date":"06-14-2014",
				"desc":"You can now save builds to view later"
			},
			{
				"name":"1.0.0",
				"date":"06-10-2014",
				"desc":"Release"
			}
		],
		author: {
			name: "mudzereli",
			link: "http://www.mudzereli.com"
		}
	};

	$scope.character = CharacterFactory.getCharacter();

	$scope.copyExportLink = function() {
		return $scope.app.url + "/load/" + character.serialize();
	};

	$scope.history = function() {
		var modal = $modal.open({
			templateUrl: "app/history-modal/history-modal.html",
			controller: "HistoryModalController",
			size: 'lg'
		});
	};
	
	$scope.save = function() {
		var history = {
			saves: []
		};
		var cookie = localStorageService.get('builds');
		if(typeof cookie !== "undefined") {
			try {
				if (typeof cookie.saves != "undefined") {
					history = cookie;
				}
			} catch(e) {
				//alert("Error Parsing JSON: could not load saved builds. Try clearing your history.");
			}
		}
		var date = new Date();
		var save = {};
		var spec = [];
		save.name =  (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear() + "@" + date.getHours() + ":" + date.getMinutes() + ":"  + date.getSeconds();
		save.build = $scope.character.serialize();
		for(j=0;j<$scope.character.skills.length;j++) {
			var s = $scope.character.skills[j];
			if(s.isSpecialized()) {
				spec.push(s.name);
			}
		}
		save.level = $scope.character.level;
		save.spec  = spec.join(", ");
		history.saves.push(save);
		localStorageService.add('builds',history);
		alert("Build Saved!");
	};
	
	$scope.$on("$routeChangeSuccess",function() {
		if(typeof $routeParams.savefile !== "undefined") {
			character.deserialize($routeParams.savefile);
		}
	});
}])
.controller('HistoryModalController',['$scope','$modalInstance','localStorageService','$location','$route',function($scope, $modalInstance, localStorageService, $location, $route) {
	$scope.history = {
		saves: []
	};
	var cookie = localStorageService.get('builds');
	if(typeof cookie !== "undefined") {
		try {
			if (typeof cookie.saves != "undefined") {
				$scope.history = cookie;
			}
		} catch(e) {
			//alert("Error Parsing JSON: could not load saved builds. Try clearing your history.");
		}
	}
	
	$scope.getLink = function(save) {
		return "http://asheron.mudzereli.com/index.html#/load/" + save.build;
	};
	
	for(i=0;i<$scope.history.saves.length;i++) {
		var save = $scope.history.saves[i];
		save.href = $scope.getLink(save);
	}
	
	$scope.cancel = function () {
		$modalInstance.close('cancel');
	};
	
	$scope.deleteSave = function(save) {
		var index = $scope.history.saves.indexOf(save);
		if (index > -1) {
			$scope.history.saves.splice(index,1);
		}
		localStorageService.add('builds',$scope.history);
	};
	
	$scope.redirect = function(save) {
		$scope.cancel();
		$location.path("/load/" + save.build);
		$route.reload();
	};

	$scope.submit = function() {
		localStorageService.add('builds',$scope.history);
	};
}]);
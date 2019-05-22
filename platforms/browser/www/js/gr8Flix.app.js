var domain = 'http://ikafe.tk/tg/';

//var app = angular.module('ktApp', ['ngAnimate']);
var app = angular.module('ktApp', ['ngAnimate', 'dang-jssor']);

app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
		'http://ikafe.tk/tg/**'
    ])
}]);

app.controller('ktCtrl', function($scope, $http, $timeout, $anchorScroll, $window, $location) {

	//$scope.zoomFactor = Math.min(window.innerWidth/19.20, window.innerHeight/10.24);
	$scope.zoomFactor = window.innerWidth/19.20;
	
	$scope.sdarotSectionOptions = {
		$AutoPlay: 0,
		$SlideDuration: 50,
		$SlideWidth: 262,
		$SlideHeight: 172,
		$SlideSpacing: 8,
		$Loop: 1,
	};

	$scope.sratimSectionOptions = {
		$AutoPlay: 0,
		$SlideDuration: 30,
		$SlideWidth: 200,
		$SlideHeight: 300,
		$SlideSpacing: 10,
		$Loop: 1,
	};
	
    $scope.episodes = null;
    $scope.season_id = -1;
    $scope.episode_id = -1;

	$scope.videoinit = function () {
		//$scope.player = jwplayer("video");
	};
	
	var season_select = function (season) {
        $scope.season_id = season;
		$scope.episodes = $scope.video_content.content[$scope.season_id];
    };

    $scope.episode_select = function (episode) {
        $scope.episode_id = episode;
        //var url = video_url+'?ref='+serie_episodes[$scope.season_id][$scope.episode_id];
        //if (subs1) url += "&sub=http://google.itv-channel.com/subs/?id="+$scope.view_id;
		//$scope.player.setup({sources: [{"type":"video/mp4","label":"HD","file":"https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4"}]});
		var vid = document.getElementById("video1");
		vid.src = "http://163.172.175.218/video/?ref=258467";
    };

	$scope.sldr = {};
    $scope.init = function () {
        $http.get(domain + 'srv/promo.txt?ts=' + (new Date()).getTime())
            .then(function (result) {
                $scope.video_contents = result.data;
            });
    };
	
	$scope.notSorted = function(obj){
        if (!obj) {
            return [];
        }
        return Object.keys(obj);
    }
	
	$scope.keydown = function ($event) {
		var code = $event.keyCode;
		if (code==13 || code==27 || (code>=37 && code<=40)) {
			$event.stopPropagation();
			$event.preventDefault();
			keypressed(code);
        }
    };
	
	$scope.section_id = 0;
    var keypressed = function (code) {
		if (code==13) {
			if ($scope.season_id==-1) {
				$scope.sidra_info_show = true;
				$timeout(function () { $scope.sidratxtinfo_show = true; }, 200);
				var files = $scope.video_contents[$scope.section_id-1].files;
				var index = $scope.sldr.test[$scope.section_id].slider.$CurrentIndex() - 3;
				if (index<0) index = index + files.length;
				id = files[index];
				$http.get(domain + 'srv/content.php?id=' + id)
					.then(function (result) {
						$scope.video_content = result.data;
						var length = Object.keys(result.data.content).length;
						season_select(Object.keys(result.data.content)[length-1]);
						$scope.episode_id = Object.keys($scope.episodes)[Object.keys($scope.episodes).length-1];
					});
			} else if ($scope.episode_id = -1) {
				$scope.episode_id = Object.keys($scope.episodes)[Object.keys($scope.episodes).length-1];
			} else {
				//video
			}
		}
		else if (code==27) {
			$scope.sidra_info_show = false;
			$scope.sidratxtinfo_show = false;
			$scope.season_id = -1;
		}
		else {
			if ($scope.season_id==-1) {
				$scope.sidra_info_show = false;
				if (code==38 && $scope.section_id>0) $scope.section_id = $scope.section_id - 1;
				else if (code==40 && $scope.section_id<$scope.video_contents.length) $scope.section_id = $scope.section_id + 1;
				else if (code==37) $scope.sldr.test[$scope.section_id].next();
				else if (code==39) $scope.sldr.test[$scope.section_id].prev();
				var newHash = 'section' + $scope.section_id;
				if ($location.hash() !== newHash) $location.hash(newHash);
			} else if ($scope.episode_id==-1){
				if (code==40) {
					$scope.episode_id = Object.keys($scope.episodes)[Object.keys($scope.episodes).length-1];
				} else {
					var length = Object.keys($scope.video_content.content).length;
					var index = Object.keys($scope.video_content.content).indexOf($scope.season_id);
					if (code==37 && index<length-1) index += 1;
					else if (code==39 && index>0) index -= 1;
					season_select(Object.keys($scope.video_content.content)[index]);
				}
			} else {
				if (code==38) {
					$scope.episode_id =-1;
				} else {
					var length = Object.keys($scope.episodes).length;
					var index = Object.keys($scope.episodes).indexOf($scope.episode_id);
					if (code==37 && index<length-1) index += 1;
					else if (code==39 && index>0) index -= 1;
					$scope.episode_id = Object.keys($scope.episodes)[index];
				}
			}
		}
	};
});
<?php

function returnApi($state,$msg,$data = '',$url = ''){

	$result['state'] = $state;

	$result['msg'] = $msg;

	if($data != null){
		$data['data'] = $data;
	}

	if($url != ''){
		$result['url'] = $url;
	}
	
	return json_encode($result);
}
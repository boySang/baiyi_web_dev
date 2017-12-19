<?php 
namespace Admin\Model;
use Think\Model;

class AdminModel extends Model{


	public function ajaxLogin(){

		$d = $this->where('name="%s" AND paswd="%s"',I('post.name'),md5(I('post.paswd')))->find();
		if($d['state'] == 0){
			return returnApi(201,'该账号禁止登陆，请联系管理员');
		}
		if($d){
	        session('auth',$d['auth']);
	        session('name',$d['name']);
			return returnApi(200,'登陆成功！','',U('Admin/Index/index'));
		}else{
			return returnApi(201,'账号或密码错误！');
		}
	}
}
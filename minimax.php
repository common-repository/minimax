<?php

/*
Plugin Name: minimax
Version: 0.3.7
Plugin URI: http://www.sebaxtian.com/acerca-de/minimax
Description: Minimax is a minimal ajax library.
Author: Juan Sebastián Echeverry
Author URI: http://www.sebaxtian.com/
*/

/* Copyright 2008-2010 Juan Sebastián Echeverry (email : sebaxtian@gawab.com)

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
*/

add_action('admin_head', 'minimax_header');
add_action('wp_head', 'minimax_header');

/**
* Function to add scripts into headers
*
* @access public
*/
	
function minimax_header() {
	$dir_name = '/wp-content/plugins/minimax';
	$url=get_bloginfo('wpurl');
	$script= $url . $dir_name . "/scripts/minimax.js";
	$script_universal= $url . $dir_name . "/scripts/universal.js";
	echo "\n<script type='text/javascript' src='$script'></script>";
	echo "\n<script type='text/javascript' src='$script_universal'></script>";
}


/**
* Function to determine if minimax has been activated.
*
* @access public
*/

function minimax() {
	return true;
}


/**
* Function to determine minimax version.
*
* @access public
*/

function minimax_version() {
	return 0.3;
}

/**
* XML Entity Mandatory Escape Characters
*
* @access public
* @param string string The string to change
* @return string The chabged string
*/
function mnmx_xmlentities($string) { 
	$string = (string) $string;
   return str_replace ( array ( '&', '"', "'", '<', '>' ), array ( '&amp;' , '&quot;', '&#39;' , '&lt;' , '&gt;' ), $string ); 
}


/**
* A kind of readfile function to determine if use Curl or fopen.
*
* @access public
* @param string filename URI of the File to open
* @return The content of the file
*/
function mnmx_readfile($filename)
{
	//Just to declare the variables
	$data = false;
	$have_curl = false;
	$local_file = false;
	
	if(function_exists(curl_init)) { //do we have curl installed?
		$have_curl = true;
	}
	
	$search = "@([\w]*)://@i"; //is the file to read a local file?
	if (!preg_match_all($search, $filename, $matches)) {
		$local_file = true;
	}
	
	if($local_file) { //A local file can be handle by fopen
		if($fop = @fopen($filename, 'r')) {
			$data = null;
			while(!feof($fop))
				$data .= fread($fop, 1024);
			fclose($fop);
		}
	} else { //Oops, an external file
		if($have_curl) { //Try with curl
			if($ch = curl_init($filename)) {
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_HEADER, 0);
				$data=curl_exec($ch);
				curl_close($ch);
			}
		} else { //Try with fsockopen
			$url = parse_url($filename);
			if($fp = fsockopen($url['host'], 80)) {
				//Enviar datos POST
				fputs($fp, "POST " . $url['path'] . " HTTP/1.0\r\n");
				fputs($fp, "Content-Type: application/x-www-form-urlencoded\r\n");
				fputs($fp, "Content-Length: " . strlen($url['query']) . "\r\n");
				fputs($fp, "Connection: close \r\r\n\n");
				fputs($fp, $url['query'] . "\r\n");
				 
				//Obtener datos
				while(!feof($fp))
				    $data .= fgets($fp, 1024);
				fclose($fp);
				
				$chunked = false;
				$http_status = trim(substr($data, 0, strpos($data, "\n")));
				if ( $http_status != 'HTTP/1.1 200 OK' ) {
					die('The web service endpoint returned a "' . $http_status . '" response');
				}
				if ( strpos($data, 'Transfer-Encoding: chunked') !== false ) {
					$temp = trim(strstr($data, "\r\n\r\n"));
					$data = '';
					$length = trim(substr($temp, 0, strpos($temp, "\r")));
					while ( trim($temp) != "0" && ($length = trim(substr($temp, 0, strpos($temp, "\r")))) != "0" ) {
						$data .= trim(substr($temp, strlen($length)+2, hexdec($length)));
						$temp = trim(substr($temp, strlen($length) + 2 + hexdec($length)));
					}
				} elseif ( strpos($data, 'HTTP/1.1 200 OK') !== false ) {
					$data = trim(strstr($data, "\r\n\r\n"));
				}
			}
		}
	}

	return $data;
}

?>

<?php        
namespace Bertigolf\Bertigolfnewsgeo\ViewHelpers;
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2014 Berti Golf <info@berti-golf.de>, berti-golf.de
 *  
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/
use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;
use bertigolf\Bertigolfnewsgeo\Domain\Model\News;
//use Tx_News_Domain_Model_News;
/**
 *
 *
 * @package bertigolfnewsgeo
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
 class ImageIdViewHelper extends AbstractViewHelper {
	
	/**
	 * gibt den  zugehörigge Katalogtext zurück
	 *
	 * @param object $news
	 * @param array $settings
	 * 
	 * @return integer $imageId;
	 */
	public function render( $news=NULL,$settings=array()) {
	  	/** @var int */
		$imageId=0;
		foreach ( $settings['image'] as $key => $image){
			/** @var intger */
			$pids = explode(',', $image['pid'] );;
			if (in_array( $news->getPid() , $pids)){
				$imageId=$key;
			}else{
				//todo check categories		
			}
		}
		return $imageId;
		
	}
}	
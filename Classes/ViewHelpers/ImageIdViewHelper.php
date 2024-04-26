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
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;
use GeorgRinger\News\Domain\Model\NewsDefault as News;

/**
 *
 *
 * @package bertigolfnewsgeo
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
 class ImageIdViewHelper extends AbstractViewHelper {
    
	 use CompileWithRenderStatic;
	 
	 protected $escapeOutput = false;
    
    /**
     * initialisiert Argumente
     *
    */    
    public function initializeArguments()
    {
        parent::initializeArguments();
        //$this->registerUniversalTagAttributes();
        $this->registerArgument('news', News::class, 'news item', true);
        $this->registerArgument('settings', 'array', 'Settings', false, []);
    }	
	/**
	 * gibt den  zugehörigge Katalogtext zurück
	 *
	 * 
	 * @return integer $imageId;
	 */
public static function renderStatic(
		array $arguments,
        \Closure $renderChildrenClosure,
        RenderingContextInterface $renderingContext,
	): string {
	  	/** @var int */
		$imageId=0;
		/** @var News $newsItem */
                $newsItem = $arguments['news'];
		$settings = $arguments['settings'];
		foreach ( $settings['image'] as $key => $image){
			/** @var intger */
			$pids = explode(',', $image['pid'] );;
			if (in_array( $newsItem->getPid() , $pids)){
				$imageId=$key;
			}else{
				//todo check categories		
			}
		}
		return $imageId;	
	}
}	
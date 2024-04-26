<?php        
namespace Bertigolf\Bertigolfnewsgeo\ViewHelpers;
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2014-2024 Berti Golf <info@berti-golf.de>, berti-golf.de
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
//use TYPO3FLUID\FLUID\CORE\VIEWHELPER\AbstractConditionViewHelper as AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\ViewHelper\Traits\CompileWithRenderStatic;
/**
 *
 *
 * @package bertigolfnewsgeo
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
 class MapViewHelper extends AbstractViewHelper {
	 
	 use CompileWithRenderStatic;
	 
	 protected $escapeOutput = false;
	 
    /**
     * Initialize arguments.
     *
     * @api
     * @throws \TYPO3Fluid\Fluid\Core\ViewHelper\Exception
    */
    public function initializeArguments()
		{
        parent::initializeArguments();

        $this->registerArgument('uid', 'integer', 'uid', false,0);
        $this->registerArgument('titel', 'string', 'titel', false, '');
        $this->registerArgument('untertitel', 'string', 'untertitel', false, '');
        $this->registerArgument('info', 'string', 'info', false, '');
        $this->registerArgument('lat', 'float', 'lat', false,0);
        $this->registerArgument('lng', 'float', 'lng', false,0);
        $this->registerArgument('imageId', 'integer', 'imageId', false,0);
    }
	/**
	 * gibt den  zugehörigge Katalogtext zurück
	 * 
	 * @return string
	 */
	public static function renderStatic(
		array $arguments,
        \Closure $renderChildrenClosure,
        RenderingContextInterface $renderingContext,
	): string  {
	  	/** @var array $map */
		$map=array();
	
		if($arguments['lat'] <> 0 and $arguments['lng']<> 0){
			$map = array(
				'uid' => $arguments['uid'],
				'titel' => $arguments['titel'],
				'untertitel' => $arguments['untertitel'],
				'info' => $arguments['info'],
				'lat' => $arguments['lat'],
				'lng' => $arguments['lng'],
				'imageId' => $arguments['imageId']	
			);
			
		}
		return json_encode( $map );
		
	}
}	
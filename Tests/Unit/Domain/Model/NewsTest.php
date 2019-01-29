<?php

namespace bertigolf\Bertigolfnewsgeo\Tests;
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
 *  the Free Software Foundation; either version 2 of the License, or
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

/**
 * Test case for class \bertigolf\Bertigolfnewsgeo\Domain\Model\News.
 *
 * @version $Id$
 * @copyright Copyright belongs to the respective authors
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 * @package TYPO3
 * @subpackage Geokoordinaten NEWS
 *
 * @author Berti Golf <info@berti-golf.de>
 */
class NewsTest extends \TYPO3\CMS\Extbase\Tests\Unit\BaseTestCase {
	/**
	 * @var \bertigolf\Bertigolfnewsgeo\Domain\Model\News
	 */
	protected $fixture;

	public function setUp() {
		$this->fixture = new \bertigolf\Bertigolfnewsgeo\Domain\Model\News();
	}

	public function tearDown() {
		unset($this->fixture);
	}

	/**
	 * @test
	 */
	public function getLonReturnsInitialValueForFloat() { 
		$this->assertSame(
			0.0,
			$this->fixture->getLon()
		);
	}

	/**
	 * @test
	 */
	public function setLonForFloatSetsLon() { 
		$this->fixture->setLon(3.14159265);

		$this->assertSame(
			3.14159265,
			$this->fixture->getLon()
		);
	}
	
	/**
	 * @test
	 */
	public function getLatReturnsInitialValueForFloat() { 
		$this->assertSame(
			0.0,
			$this->fixture->getLat()
		);
	}

	/**
	 * @test
	 */
	public function setLatForFloatSetsLat() { 
		$this->fixture->setLat(3.14159265);

		$this->assertSame(
			3.14159265,
			$this->fixture->getLat()
		);
	}
	
	/**
	 * @test
	 */
	public function getTrackReturnsInitialValueForString() { }

	/**
	 * @test
	 */
	public function setTrackForStringSetsTrack() { 
		$this->fixture->setTrack('Conceived at T3CON10');

		$this->assertSame(
			'Conceived at T3CON10',
			$this->fixture->getTrack()
		);
	}
	
}
?>
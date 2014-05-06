<?php
namespace bertigolf\Bertigolfnewsgeo\Domain\Model;

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

/**
 *
 *
 * @package bertigolfnewsgeo
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
class NewsExternal extends \Tx_News_Domain_Model_NewsExternal{

	/**
	 * Longitude
	 *
	 * @var \float
	 */
	protected $lon;

	/**
	 * Latitude
	 *
	 * @var \float
	 */
	protected $lat;

	/**
	 * Track der Route
	 *
	 * @var \string
	 */
	protected $track;

	/**
	 * Returns the lon
	 *
	 * @return \float $lon
	 */
	public function getLon() {
		return $this->lon;
	}

	/**
	 * Sets the lon
	 *
	 * @param \float $lon
	 * @return void
	 */
	public function setLon($lon) {
		$this->lon = $lon;
	}

	/**
	 * Returns the lat
	 *
	 * @return \float $lat
	 */
	public function getLat() {
		return $this->lat;
	}

	/**
	 * Sets the lat
	 *
	 * @param \float $lat
	 * @return void
	 */
	public function setLat($lat) {
		$this->lat = $lat;
	}

	/**
	 * Returns the track
	 *
	 * @return \string $track
	 */
	public function getTrack() {
		return $this->track;
	}

	/**
	 * Sets the track
	 *
	 * @param \string $track
	 * @return void
	 */
	public function setTrack($track) {
		$this->track = $track;
	}

}
?>
<?php
namespace Bertigolf\Bertigolfnewsgeo\Domain\Model;

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
use GeorgRinger\News\Domain\Model\NewsDefault;
use TYPO3\CMS\Extbase\Domain\Model\FileReference;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/**
 * News
 */
class News extends NewsDefault
{
    /**
     * Longitude
     *
     * @var float
     */
    protected float $lon = 0.0;

    /**
     * Latitude
     *
     * @var float
     */
    protected float $lat = 0.0;

    /**
     * Track der Route
     *
     * @var ObjectStorage<FileReference>
     */
    protected ?ObjectStorage $track = null;

    /**
     * @return float
     */
    public function getLon(): float
    {
        return $this->lon;
    }

    /**
     * @param float $lon
     */
    public function setLon(float $lon): void
    {
        $this->lon = $lon;
    }

    /**
     * @return float
     */
    public function getLat(): float
    {
        return $this->lat;
    }

    /**
     * @param float $lat
     */
    public function setLat(float $lat): void
    {
        $this->lat = $lat;
    }

    /**
     * @return ObjectStorage|null
     */
    public function getTrack(): ?ObjectStorage
    {
        return $this->track;
    }

    /**
     * @param ObjectStorage|null $track
     */
    public function setTrack(?ObjectStorage $track): void
    {
        $this->track = $track;
    }
}
?>
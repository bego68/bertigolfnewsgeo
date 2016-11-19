<?php

namespace bertigolf\Bertigolfnewsgeo\ViewHelpers;

/**
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * ViewHelper to render links from news records to detail view or page
 *
 * # Example: Basic link
 * <code>
 * <n:link newsItem="{newsItem}" settings="{settings}">
 *    {newsItem.title}
 * </n:link>
 * </code>
 * <output>
 * A link to the given news record using the news title as link text
 * </output>
 *
 * # Example: Set an additional attribute
 * # Description: Available: class, dir, id, lang, style, title, accesskey, tabindex, onclick
 * <code>
 * <n:link newsItem="{newsItem}" settings="{settings}" class="a-link-class">fo</n:link>
 * </code>
 * <output>
 * <a href="link" class="a-link-class">fo</n:link>
 * </output>
 *
 * # Example: Return the link only
 * <code>
 * <n:link newsItem="{newsItem}" settings="{settings}" uriOnly="1" />
 * </code>
 * <output>
 * The uri is returned
 * </output>
 *
 */
class LinkViewHelper extends \GeorgRinger\News\ViewHelpers\LinkViewHelper {
	
	/**
	 * Render link to news item or internal/external pages
	 *
	 * @param \GeorgRinger\News\Domain\Model\News $newsItem current news object
	 * @param array $settings
	 * @param boolean $uriOnly return only the url without the a-tag
	 * @param array $configuration optional typolink configuration
	 * @param string $content optional content which is linked
	 * @return string link
	 */
	public function render(\GeorgRinger\News\Domain\Model\News $newsItem, array $settings = array(), $uriOnly = FALSE, $configuration = array(), $content = '') {
		$tsSettings = $this->pluginSettingsService->getSettings();

		$this->init();

		$newsType = (int)$newsItem->getType();
		switch ($newsType) {
			// internal news
			case 1:
				if (\TYPO3\CMS\Core\Utility\GeneralUtility::isFirstPartOfStr($newsItem->getInternalurl(), 'record:')) {
					 $configuration = $this->getLinkToInternalurl($newsItem, $tsSettings);
			    }
				else {
					$configuration['parameter'] = $newsItem->getInternalurl();
				} 
				break;
			// external news
			case 2:
				$configuration['parameter'] = $newsItem->getExternalurl();
				break;
			// normal news record
			default:
				$configuration = $this->getLinkToNewsItem($newsItem, $tsSettings, $configuration);
		}
		if (isset($tsSettings['link']['typesOpeningInNewWindow'])) {
			if (GeneralUtility::inList($tsSettings['link']['typesOpeningInNewWindow'], $newsType)) {
				$this->tag->addAttribute('target', '_blank');
			}
		}

		$url = $this->cObj->typoLink_URL($configuration);
		if ($uriOnly) {
			return $url;
		}

		$this->tag->addAttribute('href', $url);

		if (empty($content)) {
			$content = $this->renderChildren();
		}
		$this->tag->setContent($content);

		return $this->tag->render();
	}

	/**
	 * Generate the link to internal URL
	 *
	 * @param \GeorgRinger\News\Domain\Model\News $newsItem
	 * @param array $tsSettings
	 * @return array
	 */
	protected function getLinkToInternalurl(\GeorgRinger\News\Domain\Model\News $newsItem, $tsSettings) {
	
		$routesDetailPid = 1518;
		$configuration['parameter'] = $routesDetailPid;		
		$urlArray = explode(":", $newsItem->getInternalurl() );
		$configuration['additionalParams'] .= '&tx_msrouten_msbergroutenshow[routes]=' . $urlArray[3];

		return $configuration;
	}

}

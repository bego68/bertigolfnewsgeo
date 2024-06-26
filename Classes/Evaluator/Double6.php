<?php
namespace Bertigolf\Bertigolfnewsgeo\Evaluator;
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
class Double6{
    function returnFieldJS() {
        return "
            var theVal = ''+value;
            var dec=0;
            if (!value)    return 0;
            for (var a=theVal.length; a>0; a--)    {
                if (theVal.substr(a-1,1)=='.' || theVal.substr(a-1,1)==',')    {
                    dec = theVal.substr(a);
                    theVal = theVal.substr(0,a-1);
                    break;
                }
            }
            dec = evalFunc.getNumChars(dec)+'000000';
            theVal=evalFunc.parseInt(evalFunc.noSpace(theVal))+TS.decimalSign+dec.substr(0,6);
            return theVal;
        ";
    }
    function evaluateFieldValue($value, $is_in, &$set) {
        $value = sprintf('%01.6f', $value);
        return $value;
    }
}
?>
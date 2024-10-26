("use strict");

const { createCountryCallingCodeOptions } = require("../src/phone-numbers");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<option value="+247" data-bmd-placeholder="40123">AC +247</option>
<option value="+376" data-bmd-placeholder="312 345">AD +376</option>
<option value="+971" data-bmd-placeholder="050 123 4567">AE +971</option>
<option value="+93" data-bmd-placeholder="070 123 4567">AF +93</option>
<option value="+1268" data-bmd-placeholder="(268) 464-1234">AG +1268</option>
<option value="+1264" data-bmd-placeholder="(264) 235-1234">AI +1264</option>
<option value="+355" data-bmd-placeholder="067 212 3456">AL +355</option>
<option value="+374" data-bmd-placeholder="077 123456">AM +374</option>
<option value="+599" data-bmd-placeholder="">AN +599</option>
<option value="+244" data-bmd-placeholder="923 123 456">AO +244</option>
<option value="+672" data-bmd-placeholder="">AQ +672</option>
<option value="+54" data-bmd-placeholder="011 15-2345-6789">AR +54</option>
<option value="+1684" data-bmd-placeholder="(684) 733-1234">AS +1684</option>
<option value="+43" data-bmd-placeholder="0664 123456">AT +43</option>
<option value="+61" data-bmd-placeholder="0412 345 678">AU +61</option>
<option value="+297" data-bmd-placeholder="560 1234">AW +297</option>
<option value="+358" data-bmd-placeholder="041 2345678">AX +358</option>
<option value="+994" data-bmd-placeholder="040 123 45 67">AZ +994</option>
<option value="+387" data-bmd-placeholder="061 123 456">BA +387</option>
<option value="+1246" data-bmd-placeholder="(246) 250-1234">BB +1246</option>
<option value="+880" data-bmd-placeholder="1812-345678">BD +880</option>
<option value="+32" data-bmd-placeholder="0470 12 34 56">BE +32</option>
<option value="+226" data-bmd-placeholder="70 12 34 56">BF +226</option>
<option value="+359" data-bmd-placeholder="043 012 345">BG +359</option>
<option value="+973" data-bmd-placeholder="3600 1234">BH +973</option>
<option value="+257" data-bmd-placeholder="79 56 12 34">BI +257</option>
<option value="+229" data-bmd-placeholder="90 01 12 34">BJ +229</option>
<option value="+590" data-bmd-placeholder="0690 00 12 34">BL +590</option>
<option value="+1441" data-bmd-placeholder="(441) 370-1234">BM +1441</option>
<option value="+673" data-bmd-placeholder="712 3456">BN +673</option>
<option value="+591" data-bmd-placeholder="71234567">BO +591</option>
<option value="+599" data-bmd-placeholder="318 1234">BQ +599</option>
<option value="+55" data-bmd-placeholder="(11) 96123-4567">BR +55</option>
<option value="+1242" data-bmd-placeholder="(242) 359-1234">BS +1242</option>
<option value="+975" data-bmd-placeholder="17 12 34 56">BT +975</option>
<option value="+267" data-bmd-placeholder="71 123 456">BW +267</option>
<option value="+375" data-bmd-placeholder="8 029 491-19-11">BY +375</option>
<option value="+501" data-bmd-placeholder="622-1234">BZ +501</option>
<option value="+1" data-bmd-placeholder="(506) 234-5678">CA +1</option>
<option value="+61" data-bmd-placeholder="0412 345 678">CC +61</option>
<option value="+243" data-bmd-placeholder="0991 234 567">CD +243</option>
<option value="+236" data-bmd-placeholder="70 01 23 45">CF +236</option>
<option value="+242" data-bmd-placeholder="06 123 4567">CG +242</option>
<option value="+41" data-bmd-placeholder="078 123 45 67">CH +41</option>
<option value="+225" data-bmd-placeholder="01 23 45 6789">CI +225</option>
<option value="+682" data-bmd-placeholder="71 234">CK +682</option>
<option value="+56" data-bmd-placeholder="(2) 2123 4567">CL +56</option>
<option value="+237" data-bmd-placeholder="6 71 23 45 67">CM +237</option>
<option value="+86" data-bmd-placeholder="131 2345 6789">CN +86</option>
<option value="+57" data-bmd-placeholder="321 1234567">CO +57</option>
<option value="+506" data-bmd-placeholder="8312 3456">CR +506</option>
<option value="+53" data-bmd-placeholder="05 1234567">CU +53</option>
<option value="+238" data-bmd-placeholder="991 12 34">CV +238</option>
<option value="+599" data-bmd-placeholder="9 518 1234">CW +599</option>
<option value="+61" data-bmd-placeholder="0412 345 678">CX +61</option>
<option value="+357" data-bmd-placeholder="96 123456">CY +357</option>
<option value="+420" data-bmd-placeholder="601 123 456">CZ +420</option>
<option value="+49" data-bmd-placeholder="01512 3456789">DE +49</option>
<option value="+253" data-bmd-placeholder="77 83 10 01">DJ +253</option>
<option value="+45" data-bmd-placeholder="34 41 23 45">DK +45</option>
<option value="+1767" data-bmd-placeholder="(767) 225-1234">DM +1767</option>
<option value="+1849" data-bmd-placeholder="(809) 234-5678">DO +1849</option>
<option value="+213" data-bmd-placeholder="0551 23 45 67">DZ +213</option>
<option value="+593" data-bmd-placeholder="099 123 4567">EC +593</option>
<option value="+372" data-bmd-placeholder="5123 4567">EE +372</option>
<option value="+20" data-bmd-placeholder="010 01234567">EG +20</option>
<option value="+212" data-bmd-placeholder="0650-123456">EH +212</option>
<option value="+291" data-bmd-placeholder="07 123 456">ER +291</option>
<option value="+34" data-bmd-placeholder="612 34 56 78">ES +34</option>
<option value="+251" data-bmd-placeholder="091 123 4567">ET +251</option>
<option value="+358" data-bmd-placeholder="041 2345678">FI +358</option>
<option value="+679" data-bmd-placeholder="701 2345">FJ +679</option>
<option value="+500" data-bmd-placeholder="51234">FK +500</option>
<option value="+691" data-bmd-placeholder="350 1234">FM +691</option>
<option value="+298" data-bmd-placeholder="211234">FO +298</option>
<option value="+33" data-bmd-placeholder="06 12 34 56 78">FR +33</option>
<option value="+241" data-bmd-placeholder="06 03 12 34">GA +241</option>
<option value="+44" data-bmd-placeholder="07400 123456">GB +44</option>
<option value="+1473" data-bmd-placeholder="(473) 403-1234">GD +1473</option>
<option value="+995" data-bmd-placeholder="555 12 34 56">GE +995</option>
<option value="+594" data-bmd-placeholder="0694 20 12 34">GF +594</option>
<option value="+44" data-bmd-placeholder="07781 123456">GG +44</option>
<option value="+233" data-bmd-placeholder="023 123 4567">GH +233</option>
<option value="+350" data-bmd-placeholder="57123456">GI +350</option>
<option value="+299" data-bmd-placeholder="22 12 34">GL +299</option>
<option value="+220" data-bmd-placeholder="301 2345">GM +220</option>
<option value="+224" data-bmd-placeholder="601 12 34 56">GN +224</option>
<option value="+590" data-bmd-placeholder="0690 00 12 34">GP +590</option>
<option value="+240" data-bmd-placeholder="222 123 456">GQ +240</option>
<option value="+30" data-bmd-placeholder="691 234 5678">GR +30</option>
<option value="+500" data-bmd-placeholder="">GS +500</option>
<option value="+502" data-bmd-placeholder="5123 4567">GT +502</option>
<option value="+1671" data-bmd-placeholder="(671) 300-1234">GU +1671</option>
<option value="+245" data-bmd-placeholder="955 012 345">GW +245</option>
<option value="+595" data-bmd-placeholder="609 1234">GY +595</option>
<option value="+852" data-bmd-placeholder="5123 4567">HK +852</option>
<option value="+672" data-bmd-placeholder="">HM +672</option>
<option value="+504" data-bmd-placeholder="9123-4567">HN +504</option>
<option value="+385" data-bmd-placeholder="092 123 4567">HR +385</option>
<option value="+509" data-bmd-placeholder="34 10 1234">HT +509</option>
<option value="+36" data-bmd-placeholder="06 20 123 4567">HU +36</option>
<option value="+62" data-bmd-placeholder="0812-345-678">ID +62</option>
<option value="+353" data-bmd-placeholder="085 012 3456">IE +353</option>
<option value="+972" data-bmd-placeholder="050-234-5678">IL +972</option>
<option value="+44" data-bmd-placeholder="07924 123456">IM +44</option>
<option value="+91" data-bmd-placeholder="081234 56789">IN +91</option>
<option value="+246" data-bmd-placeholder="380 1234">IO +246</option>
<option value="+964" data-bmd-placeholder="0791 234 5678">IQ +964</option>
<option value="+98" data-bmd-placeholder="0912 345 6789">IR +98</option>
<option value="+354" data-bmd-placeholder="611 1234">IS +354</option>
<option value="+39" data-bmd-placeholder="312 345 6789">IT +39</option>
<option value="+44" data-bmd-placeholder="07797 712345">JE +44</option>
<option value="+1876" data-bmd-placeholder="(876) 210-1234">JM +1876</option>
<option value="+962" data-bmd-placeholder="07 9012 3456">JO +962</option>
<option value="+81" data-bmd-placeholder="090-1234-5678">JP +81</option>
<option value="+254" data-bmd-placeholder="0712 123456">KE +254</option>
<option value="+996" data-bmd-placeholder="0700 123 456">KG +996</option>
<option value="+855" data-bmd-placeholder="091 234 567">KH +855</option>
<option value="+686" data-bmd-placeholder="72001234">KI +686</option>
<option value="+269" data-bmd-placeholder="321 23 45">KM +269</option>
<option value="+1869" data-bmd-placeholder="(869) 765-2917">KN +1869</option>
<option value="+850" data-bmd-placeholder="0192 123 4567">KP +850</option>
<option value="+82" data-bmd-placeholder="010-2000-0000">KR +82</option>
<option value="+965" data-bmd-placeholder="500 12345">KW +965</option>
<option value="+ 345" data-bmd-placeholder="(345) 323-1234">KY + 345</option>
<option value="+77" data-bmd-placeholder="8 (771) 000 9998">KZ +77</option>
<option value="+856" data-bmd-placeholder="020 23 123 456">LA +856</option>
<option value="+961" data-bmd-placeholder="71 123 456">LB +961</option>
<option value="+1758" data-bmd-placeholder="(758) 284-5678">LC +1758</option>
<option value="+423" data-bmd-placeholder="660 234 567">LI +423</option>
<option value="+94" data-bmd-placeholder="071 234 5678">LK +94</option>
<option value="+231" data-bmd-placeholder="077 012 3456">LR +231</option>
<option value="+266" data-bmd-placeholder="5012 3456">LS +266</option>
<option value="+370" data-bmd-placeholder="(0-612) 34567">LT +370</option>
<option value="+352" data-bmd-placeholder="628 123 456">LU +352</option>
<option value="+371" data-bmd-placeholder="21 234 567">LV +371</option>
<option value="+218" data-bmd-placeholder="091-2345678">LY +218</option>
<option value="+212" data-bmd-placeholder="0650-123456">MA +212</option>
<option value="+377" data-bmd-placeholder="06 12 34 56 78">MC +377</option>
<option value="+373" data-bmd-placeholder="0621 12 345">MD +373</option>
<option value="+382" data-bmd-placeholder="067 622 901">ME +382</option>
<option value="+590" data-bmd-placeholder="0690 00 12 34">MF +590</option>
<option value="+261" data-bmd-placeholder="032 12 345 67">MG +261</option>
<option value="+692" data-bmd-placeholder="235-1234">MH +692</option>
<option value="+389" data-bmd-placeholder="072 345 678">MK +389</option>
<option value="+223" data-bmd-placeholder="65 01 23 45">ML +223</option>
<option value="+95" data-bmd-placeholder="09 212 3456">MM +95</option>
<option value="+976" data-bmd-placeholder="8812 3456">MN +976</option>
<option value="+853" data-bmd-placeholder="6612 3456">MO +853</option>
<option value="+1670" data-bmd-placeholder="(670) 234-5678">MP +1670</option>
<option value="+596" data-bmd-placeholder="0696 20 12 34">MQ +596</option>
<option value="+222" data-bmd-placeholder="22 12 34 56">MR +222</option>
<option value="+1664" data-bmd-placeholder="(664) 492-3456">MS +1664</option>
<option value="+356" data-bmd-placeholder="9696 1234">MT +356</option>
<option value="+230" data-bmd-placeholder="5251 2345">MU +230</option>
<option value="+960" data-bmd-placeholder="771-2345">MV +960</option>
<option value="+265" data-bmd-placeholder="0991 23 45 67">MW +265</option>
<option value="+52" data-bmd-placeholder="222 123 4567">MX +52</option>
<option value="+60" data-bmd-placeholder="012-345 6789">MY +60</option>
<option value="+258" data-bmd-placeholder="82 123 4567">MZ +258</option>
<option value="+264" data-bmd-placeholder="081 123 4567">NA +264</option>
<option value="+687" data-bmd-placeholder="75.12.34">NC +687</option>
<option value="+227" data-bmd-placeholder="93 12 34 56">NE +227</option>
<option value="+672" data-bmd-placeholder="3 81234">NF +672</option>
<option value="+234" data-bmd-placeholder="0802 123 4567">NG +234</option>
<option value="+505" data-bmd-placeholder="8123 4567">NI +505</option>
<option value="+31" data-bmd-placeholder="06 12345678">NL +31</option>
<option value="+47" data-bmd-placeholder="40 61 23 45">NO +47</option>
<option value="+977" data-bmd-placeholder="984-1234567">NP +977</option>
<option value="+674" data-bmd-placeholder="555 1234">NR +674</option>
<option value="+683" data-bmd-placeholder="888 4012">NU +683</option>
<option value="+64" data-bmd-placeholder="021 123 4567">NZ +64</option>
<option value="+968" data-bmd-placeholder="9212 3456">OM +968</option>
<option value="+507" data-bmd-placeholder="6123-4567">PA +507</option>
<option value="+51" data-bmd-placeholder="912 345 678">PE +51</option>
<option value="+689" data-bmd-placeholder="87 12 34 56">PF +689</option>
<option value="+675" data-bmd-placeholder="7012 3456">PG +675</option>
<option value="+63" data-bmd-placeholder="0905 123 4567">PH +63</option>
<option value="+92" data-bmd-placeholder="0301 2345678">PK +92</option>
<option value="+48" data-bmd-placeholder="512 345 678">PL +48</option>
<option value="+508" data-bmd-placeholder="055 12 34">PM +508</option>
<option value="+872" data-bmd-placeholder="">PN +872</option>
<option value="+1939" data-bmd-placeholder="(787) 234-5678">PR +1939</option>
<option value="+970" data-bmd-placeholder="0599 123 456">PS +970</option>
<option value="+351" data-bmd-placeholder="912 345 678">PT +351</option>
<option value="+680" data-bmd-placeholder="620 1234">PW +680</option>
<option value="+595" data-bmd-placeholder="0961 456789">PY +595</option>
<option value="+974" data-bmd-placeholder="3312 3456">QA +974</option>
<option value="+262" data-bmd-placeholder="0692 12 34 56">RE +262</option>
<option value="+40" data-bmd-placeholder="0712 034 567">RO +40</option>
<option value="+381" data-bmd-placeholder="060 1234567">RS +381</option>
<option value="+7" data-bmd-placeholder="8 (912) 345-67-89">RU +7</option>
<option value="+250" data-bmd-placeholder="0720 123 456">RW +250</option>
<option value="+966" data-bmd-placeholder="051 234 5678">SA +966</option>
<option value="+677" data-bmd-placeholder="74 21234">SB +677</option>
<option value="+248" data-bmd-placeholder="2 510 123">SC +248</option>
<option value="+249" data-bmd-placeholder="091 123 1234">SD +249</option>
<option value="+46" data-bmd-placeholder="070-123 45 67">SE +46</option>
<option value="+65" data-bmd-placeholder="8123 4567">SG +65</option>
<option value="+290" data-bmd-placeholder="51234">SH +290</option>
<option value="+386" data-bmd-placeholder="031 234 567">SI +386</option>
<option value="+47" data-bmd-placeholder="41 23 45 67">SJ +47</option>
<option value="+421" data-bmd-placeholder="0912 123 456">SK +421</option>
<option value="+232" data-bmd-placeholder="(025) 123456">SL +232</option>
<option value="+378" data-bmd-placeholder="66 66 12 12">SM +378</option>
<option value="+221" data-bmd-placeholder="70 123 45 67">SN +221</option>
<option value="+252" data-bmd-placeholder="7 1123456">SO +252</option>
<option value="+597" data-bmd-placeholder="741-2345">SR +597</option>
<option value="+211" data-bmd-placeholder="0977 123 456">SS +211</option>
<option value="+239" data-bmd-placeholder="981 2345">ST +239</option>
<option value="+503" data-bmd-placeholder="7012 3456">SV +503</option>
<option value="+1" data-bmd-placeholder="(721) 520-5678">SX +1</option>
<option value="+963" data-bmd-placeholder="0944 567 890">SY +963</option>
<option value="+268" data-bmd-placeholder="7612 3456">SZ +268</option>
<option value="+290" data-bmd-placeholder="8999">TA +290</option>
<option value="+1649" data-bmd-placeholder="(649) 231-1234">TC +1649</option>
<option value="+235" data-bmd-placeholder="63 01 23 45">TD +235</option>
<option value="+262" data-bmd-placeholder="">TF +262</option>
<option value="+228" data-bmd-placeholder="90 11 23 45">TG +228</option>
<option value="+66" data-bmd-placeholder="081 234 5678">TH +66</option>
<option value="+992" data-bmd-placeholder="91 712 3456">TJ +992</option>
<option value="+690" data-bmd-placeholder="7290">TK +690</option>
<option value="+670" data-bmd-placeholder="7721 2345">TL +670</option>
<option value="+993" data-bmd-placeholder="8 66 123456">TM +993</option>
<option value="+216" data-bmd-placeholder="20 123 456">TN +216</option>
<option value="+676" data-bmd-placeholder="771 5123">TO +676</option>
<option value="+90" data-bmd-placeholder="0501 234 56 78">TR +90</option>
<option value="+1868" data-bmd-placeholder="(868) 291-1234">TT +1868</option>
<option value="+688" data-bmd-placeholder="90 1234">TV +688</option>
<option value="+886" data-bmd-placeholder="0912 345 678">TW +886</option>
<option value="+255" data-bmd-placeholder="0621 234 567">TZ +255</option>
<option value="+380" data-bmd-placeholder="050 123 4567">UA +380</option>
<option value="+256" data-bmd-placeholder="0712 345678">UG +256</option>
<option value="+1" selected data-bmd-placeholder="(201) 555-0123">US +1</option>
<option value="+598" data-bmd-placeholder="094 231 234">UY +598</option>
<option value="+998" data-bmd-placeholder="91 234 56 78">UZ +998</option>
<option value="+379" data-bmd-placeholder="312 345 6789">VA +379</option>
<option value="+1784" data-bmd-placeholder="(784) 430-1234">VC +1784</option>
<option value="+58" data-bmd-placeholder="0412-1234567">VE +58</option>
<option value="+1284" data-bmd-placeholder="(284) 300-1234">VG +1284</option>
<option value="+1340" data-bmd-placeholder="(340) 642-1234">VI +1340</option>
<option value="+84" data-bmd-placeholder="0912 345 678">VN +84</option>
<option value="+678" data-bmd-placeholder="591 2345">VU +678</option>
<option value="+681" data-bmd-placeholder="82 12 34">WF +681</option>
<option value="+685" data-bmd-placeholder="72 12345">WS +685</option>
<option value="+383" data-bmd-placeholder="043 201 234">XK +383</option>
<option value="+967" data-bmd-placeholder="0712 345 678">YE +967</option>
<option value="+262" data-bmd-placeholder="0639 01 23 45">YT +262</option>
<option value="+27" data-bmd-placeholder="071 123 4567">ZA +27</option>
<option value="+260" data-bmd-placeholder="095 5123456">ZM +260</option>
<option value="+263" data-bmd-placeholder="071 234 5678">ZW +263</option>
`;

test("Case 1", () => {
	expect(
		beautify(createCountryCallingCodeOptions("US", []), { format: "html" }),
	).toBe(beautify(expectedTemplate1, { format: "html" }));
});

// Case 2 (lower case country code)

const expectedTemplate2 = `
<option value="+247" data-bmd-placeholder="40123">AC +247</option>
<option value="+376" data-bmd-placeholder="312 345">AD +376</option>
<option value="+971" data-bmd-placeholder="050 123 4567">AE +971</option>
<option value="+93" data-bmd-placeholder="070 123 4567">AF +93</option>
<option value="+1268" data-bmd-placeholder="(268) 464-1234">AG +1268</option>
<option value="+1264" data-bmd-placeholder="(264) 235-1234">AI +1264</option>
<option value="+355" data-bmd-placeholder="067 212 3456">AL +355</option>
<option value="+374" data-bmd-placeholder="077 123456">AM +374</option>
<option value="+599" data-bmd-placeholder="">AN +599</option>
<option value="+244" data-bmd-placeholder="923 123 456">AO +244</option>
<option value="+672" data-bmd-placeholder="">AQ +672</option>
<option value="+54" data-bmd-placeholder="011 15-2345-6789">AR +54</option>
<option value="+1684" data-bmd-placeholder="(684) 733-1234">AS +1684</option>
<option value="+43" data-bmd-placeholder="0664 123456">AT +43</option>
<option value="+61" data-bmd-placeholder="0412 345 678">AU +61</option>
<option value="+297" data-bmd-placeholder="560 1234">AW +297</option>
<option value="+358" data-bmd-placeholder="041 2345678">AX +358</option>
<option value="+994" data-bmd-placeholder="040 123 45 67">AZ +994</option>
<option value="+387" data-bmd-placeholder="061 123 456">BA +387</option>
<option value="+1246" data-bmd-placeholder="(246) 250-1234">BB +1246</option>
<option value="+880" selected data-bmd-placeholder="1812-345678">BD +880</option>
<option value="+32" data-bmd-placeholder="0470 12 34 56">BE +32</option>
<option value="+226" data-bmd-placeholder="70 12 34 56">BF +226</option>
<option value="+359" data-bmd-placeholder="043 012 345">BG +359</option>
<option value="+973" data-bmd-placeholder="3600 1234">BH +973</option>
<option value="+257" data-bmd-placeholder="79 56 12 34">BI +257</option>
<option value="+229" data-bmd-placeholder="90 01 12 34">BJ +229</option>
<option value="+590" data-bmd-placeholder="0690 00 12 34">BL +590</option>
<option value="+1441" data-bmd-placeholder="(441) 370-1234">BM +1441</option>
<option value="+673" data-bmd-placeholder="712 3456">BN +673</option>
<option value="+591" data-bmd-placeholder="71234567">BO +591</option>
<option value="+599" data-bmd-placeholder="318 1234">BQ +599</option>
<option value="+55" data-bmd-placeholder="(11) 96123-4567">BR +55</option>
<option value="+1242" data-bmd-placeholder="(242) 359-1234">BS +1242</option>
<option value="+975" data-bmd-placeholder="17 12 34 56">BT +975</option>
<option value="+267" data-bmd-placeholder="71 123 456">BW +267</option>
<option value="+375" data-bmd-placeholder="8 029 491-19-11">BY +375</option>
<option value="+501" data-bmd-placeholder="622-1234">BZ +501</option>
<option value="+1" data-bmd-placeholder="(506) 234-5678">CA +1</option>
<option value="+61" data-bmd-placeholder="0412 345 678">CC +61</option>
<option value="+243" data-bmd-placeholder="0991 234 567">CD +243</option>
<option value="+236" data-bmd-placeholder="70 01 23 45">CF +236</option>
<option value="+242" data-bmd-placeholder="06 123 4567">CG +242</option>
<option value="+41" data-bmd-placeholder="078 123 45 67">CH +41</option>
<option value="+225" data-bmd-placeholder="01 23 45 6789">CI +225</option>
<option value="+682" data-bmd-placeholder="71 234">CK +682</option>
<option value="+56" data-bmd-placeholder="(2) 2123 4567">CL +56</option>
<option value="+237" data-bmd-placeholder="6 71 23 45 67">CM +237</option>
<option value="+86" data-bmd-placeholder="131 2345 6789">CN +86</option>
<option value="+57" data-bmd-placeholder="321 1234567">CO +57</option>
<option value="+506" data-bmd-placeholder="8312 3456">CR +506</option>
<option value="+53" data-bmd-placeholder="05 1234567">CU +53</option>
<option value="+238" data-bmd-placeholder="991 12 34">CV +238</option>
<option value="+599" data-bmd-placeholder="9 518 1234">CW +599</option>
<option value="+61" data-bmd-placeholder="0412 345 678">CX +61</option>
<option value="+357" data-bmd-placeholder="96 123456">CY +357</option>
<option value="+420" data-bmd-placeholder="601 123 456">CZ +420</option>
<option value="+49" data-bmd-placeholder="01512 3456789">DE +49</option>
<option value="+253" data-bmd-placeholder="77 83 10 01">DJ +253</option>
<option value="+45" data-bmd-placeholder="34 41 23 45">DK +45</option>
<option value="+1767" data-bmd-placeholder="(767) 225-1234">DM +1767</option>
<option value="+1849" data-bmd-placeholder="(809) 234-5678">DO +1849</option>
<option value="+213" data-bmd-placeholder="0551 23 45 67">DZ +213</option>
<option value="+593" data-bmd-placeholder="099 123 4567">EC +593</option>
<option value="+372" data-bmd-placeholder="5123 4567">EE +372</option>
<option value="+20" data-bmd-placeholder="010 01234567">EG +20</option>
<option value="+212" data-bmd-placeholder="0650-123456">EH +212</option>
<option value="+291" data-bmd-placeholder="07 123 456">ER +291</option>
<option value="+34" data-bmd-placeholder="612 34 56 78">ES +34</option>
<option value="+251" data-bmd-placeholder="091 123 4567">ET +251</option>
<option value="+358" data-bmd-placeholder="041 2345678">FI +358</option>
<option value="+679" data-bmd-placeholder="701 2345">FJ +679</option>
<option value="+500" data-bmd-placeholder="51234">FK +500</option>
<option value="+691" data-bmd-placeholder="350 1234">FM +691</option>
<option value="+298" data-bmd-placeholder="211234">FO +298</option>
<option value="+33" data-bmd-placeholder="06 12 34 56 78">FR +33</option>
<option value="+241" data-bmd-placeholder="06 03 12 34">GA +241</option>
<option value="+44" data-bmd-placeholder="07400 123456">GB +44</option>
<option value="+1473" data-bmd-placeholder="(473) 403-1234">GD +1473</option>
<option value="+995" data-bmd-placeholder="555 12 34 56">GE +995</option>
<option value="+594" data-bmd-placeholder="0694 20 12 34">GF +594</option>
<option value="+44" data-bmd-placeholder="07781 123456">GG +44</option>
<option value="+233" data-bmd-placeholder="023 123 4567">GH +233</option>
<option value="+350" data-bmd-placeholder="57123456">GI +350</option>
<option value="+299" data-bmd-placeholder="22 12 34">GL +299</option>
<option value="+220" data-bmd-placeholder="301 2345">GM +220</option>
<option value="+224" data-bmd-placeholder="601 12 34 56">GN +224</option>
<option value="+590" data-bmd-placeholder="0690 00 12 34">GP +590</option>
<option value="+240" data-bmd-placeholder="222 123 456">GQ +240</option>
<option value="+30" data-bmd-placeholder="691 234 5678">GR +30</option>
<option value="+500" data-bmd-placeholder="">GS +500</option>
<option value="+502" data-bmd-placeholder="5123 4567">GT +502</option>
<option value="+1671" data-bmd-placeholder="(671) 300-1234">GU +1671</option>
<option value="+245" data-bmd-placeholder="955 012 345">GW +245</option>
<option value="+595" data-bmd-placeholder="609 1234">GY +595</option>
<option value="+852" data-bmd-placeholder="5123 4567">HK +852</option>
<option value="+672" data-bmd-placeholder="">HM +672</option>
<option value="+504" data-bmd-placeholder="9123-4567">HN +504</option>
<option value="+385" data-bmd-placeholder="092 123 4567">HR +385</option>
<option value="+509" data-bmd-placeholder="34 10 1234">HT +509</option>
<option value="+36" data-bmd-placeholder="06 20 123 4567">HU +36</option>
<option value="+62" data-bmd-placeholder="0812-345-678">ID +62</option>
<option value="+353" data-bmd-placeholder="085 012 3456">IE +353</option>
<option value="+972" data-bmd-placeholder="050-234-5678">IL +972</option>
<option value="+44" data-bmd-placeholder="07924 123456">IM +44</option>
<option value="+91" data-bmd-placeholder="081234 56789">IN +91</option>
<option value="+246" data-bmd-placeholder="380 1234">IO +246</option>
<option value="+964" data-bmd-placeholder="0791 234 5678">IQ +964</option>
<option value="+98" data-bmd-placeholder="0912 345 6789">IR +98</option>
<option value="+354" data-bmd-placeholder="611 1234">IS +354</option>
<option value="+39" data-bmd-placeholder="312 345 6789">IT +39</option>
<option value="+44" data-bmd-placeholder="07797 712345">JE +44</option>
<option value="+1876" data-bmd-placeholder="(876) 210-1234">JM +1876</option>
<option value="+962" data-bmd-placeholder="07 9012 3456">JO +962</option>
<option value="+81" data-bmd-placeholder="090-1234-5678">JP +81</option>
<option value="+254" data-bmd-placeholder="0712 123456">KE +254</option>
<option value="+996" data-bmd-placeholder="0700 123 456">KG +996</option>
<option value="+855" data-bmd-placeholder="091 234 567">KH +855</option>
<option value="+686" data-bmd-placeholder="72001234">KI +686</option>
<option value="+269" data-bmd-placeholder="321 23 45">KM +269</option>
<option value="+1869" data-bmd-placeholder="(869) 765-2917">KN +1869</option>
<option value="+850" data-bmd-placeholder="0192 123 4567">KP +850</option>
<option value="+82" data-bmd-placeholder="010-2000-0000">KR +82</option>
<option value="+965" data-bmd-placeholder="500 12345">KW +965</option>
<option value="+ 345" data-bmd-placeholder="(345) 323-1234">KY + 345</option>
<option value="+77" data-bmd-placeholder="8 (771) 000 9998">KZ +77</option>
<option value="+856" data-bmd-placeholder="020 23 123 456">LA +856</option>
<option value="+961" data-bmd-placeholder="71 123 456">LB +961</option>
<option value="+1758" data-bmd-placeholder="(758) 284-5678">LC +1758</option>
<option value="+423" data-bmd-placeholder="660 234 567">LI +423</option>
<option value="+94" data-bmd-placeholder="071 234 5678">LK +94</option>
<option value="+231" data-bmd-placeholder="077 012 3456">LR +231</option>
<option value="+266" data-bmd-placeholder="5012 3456">LS +266</option>
<option value="+370" data-bmd-placeholder="(0-612) 34567">LT +370</option>
<option value="+352" data-bmd-placeholder="628 123 456">LU +352</option>
<option value="+371" data-bmd-placeholder="21 234 567">LV +371</option>
<option value="+218" data-bmd-placeholder="091-2345678">LY +218</option>
<option value="+212" data-bmd-placeholder="0650-123456">MA +212</option>
<option value="+377" data-bmd-placeholder="06 12 34 56 78">MC +377</option>
<option value="+373" data-bmd-placeholder="0621 12 345">MD +373</option>
<option value="+382" data-bmd-placeholder="067 622 901">ME +382</option>
<option value="+590" data-bmd-placeholder="0690 00 12 34">MF +590</option>
<option value="+261" data-bmd-placeholder="032 12 345 67">MG +261</option>
<option value="+692" data-bmd-placeholder="235-1234">MH +692</option>
<option value="+389" data-bmd-placeholder="072 345 678">MK +389</option>
<option value="+223" data-bmd-placeholder="65 01 23 45">ML +223</option>
<option value="+95" data-bmd-placeholder="09 212 3456">MM +95</option>
<option value="+976" data-bmd-placeholder="8812 3456">MN +976</option>
<option value="+853" data-bmd-placeholder="6612 3456">MO +853</option>
<option value="+1670" data-bmd-placeholder="(670) 234-5678">MP +1670</option>
<option value="+596" data-bmd-placeholder="0696 20 12 34">MQ +596</option>
<option value="+222" data-bmd-placeholder="22 12 34 56">MR +222</option>
<option value="+1664" data-bmd-placeholder="(664) 492-3456">MS +1664</option>
<option value="+356" data-bmd-placeholder="9696 1234">MT +356</option>
<option value="+230" data-bmd-placeholder="5251 2345">MU +230</option>
<option value="+960" data-bmd-placeholder="771-2345">MV +960</option>
<option value="+265" data-bmd-placeholder="0991 23 45 67">MW +265</option>
<option value="+52" data-bmd-placeholder="222 123 4567">MX +52</option>
<option value="+60" data-bmd-placeholder="012-345 6789">MY +60</option>
<option value="+258" data-bmd-placeholder="82 123 4567">MZ +258</option>
<option value="+264" data-bmd-placeholder="081 123 4567">NA +264</option>
<option value="+687" data-bmd-placeholder="75.12.34">NC +687</option>
<option value="+227" data-bmd-placeholder="93 12 34 56">NE +227</option>
<option value="+672" data-bmd-placeholder="3 81234">NF +672</option>
<option value="+234" data-bmd-placeholder="0802 123 4567">NG +234</option>
<option value="+505" data-bmd-placeholder="8123 4567">NI +505</option>
<option value="+31" data-bmd-placeholder="06 12345678">NL +31</option>
<option value="+47" data-bmd-placeholder="40 61 23 45">NO +47</option>
<option value="+977" data-bmd-placeholder="984-1234567">NP +977</option>
<option value="+674" data-bmd-placeholder="555 1234">NR +674</option>
<option value="+683" data-bmd-placeholder="888 4012">NU +683</option>
<option value="+64" data-bmd-placeholder="021 123 4567">NZ +64</option>
<option value="+968" data-bmd-placeholder="9212 3456">OM +968</option>
<option value="+507" data-bmd-placeholder="6123-4567">PA +507</option>
<option value="+51" data-bmd-placeholder="912 345 678">PE +51</option>
<option value="+689" data-bmd-placeholder="87 12 34 56">PF +689</option>
<option value="+675" data-bmd-placeholder="7012 3456">PG +675</option>
<option value="+63" data-bmd-placeholder="0905 123 4567">PH +63</option>
<option value="+92" data-bmd-placeholder="0301 2345678">PK +92</option>
<option value="+48" data-bmd-placeholder="512 345 678">PL +48</option>
<option value="+508" data-bmd-placeholder="055 12 34">PM +508</option>
<option value="+872" data-bmd-placeholder="">PN +872</option>
<option value="+1939" data-bmd-placeholder="(787) 234-5678">PR +1939</option>
<option value="+970" data-bmd-placeholder="0599 123 456">PS +970</option>
<option value="+351" data-bmd-placeholder="912 345 678">PT +351</option>
<option value="+680" data-bmd-placeholder="620 1234">PW +680</option>
<option value="+595" data-bmd-placeholder="0961 456789">PY +595</option>
<option value="+974" data-bmd-placeholder="3312 3456">QA +974</option>
<option value="+262" data-bmd-placeholder="0692 12 34 56">RE +262</option>
<option value="+40" data-bmd-placeholder="0712 034 567">RO +40</option>
<option value="+381" data-bmd-placeholder="060 1234567">RS +381</option>
<option value="+7" data-bmd-placeholder="8 (912) 345-67-89">RU +7</option>
<option value="+250" data-bmd-placeholder="0720 123 456">RW +250</option>
<option value="+966" data-bmd-placeholder="051 234 5678">SA +966</option>
<option value="+677" data-bmd-placeholder="74 21234">SB +677</option>
<option value="+248" data-bmd-placeholder="2 510 123">SC +248</option>
<option value="+249" data-bmd-placeholder="091 123 1234">SD +249</option>
<option value="+46" data-bmd-placeholder="070-123 45 67">SE +46</option>
<option value="+65" data-bmd-placeholder="8123 4567">SG +65</option>
<option value="+290" data-bmd-placeholder="51234">SH +290</option>
<option value="+386" data-bmd-placeholder="031 234 567">SI +386</option>
<option value="+47" data-bmd-placeholder="41 23 45 67">SJ +47</option>
<option value="+421" data-bmd-placeholder="0912 123 456">SK +421</option>
<option value="+232" data-bmd-placeholder="(025) 123456">SL +232</option>
<option value="+378" data-bmd-placeholder="66 66 12 12">SM +378</option>
<option value="+221" data-bmd-placeholder="70 123 45 67">SN +221</option>
<option value="+252" data-bmd-placeholder="7 1123456">SO +252</option>
<option value="+597" data-bmd-placeholder="741-2345">SR +597</option>
<option value="+211" data-bmd-placeholder="0977 123 456">SS +211</option>
<option value="+239" data-bmd-placeholder="981 2345">ST +239</option>
<option value="+503" data-bmd-placeholder="7012 3456">SV +503</option>
<option value="+1" data-bmd-placeholder="(721) 520-5678">SX +1</option>
<option value="+963" data-bmd-placeholder="0944 567 890">SY +963</option>
<option value="+268" data-bmd-placeholder="7612 3456">SZ +268</option>
<option value="+290" data-bmd-placeholder="8999">TA +290</option>
<option value="+1649" data-bmd-placeholder="(649) 231-1234">TC +1649</option>
<option value="+235" data-bmd-placeholder="63 01 23 45">TD +235</option>
<option value="+262" data-bmd-placeholder="">TF +262</option>
<option value="+228" data-bmd-placeholder="90 11 23 45">TG +228</option>
<option value="+66" data-bmd-placeholder="081 234 5678">TH +66</option>
<option value="+992" data-bmd-placeholder="91 712 3456">TJ +992</option>
<option value="+690" data-bmd-placeholder="7290">TK +690</option>
<option value="+670" data-bmd-placeholder="7721 2345">TL +670</option>
<option value="+993" data-bmd-placeholder="8 66 123456">TM +993</option>
<option value="+216" data-bmd-placeholder="20 123 456">TN +216</option>
<option value="+676" data-bmd-placeholder="771 5123">TO +676</option>
<option value="+90" data-bmd-placeholder="0501 234 56 78">TR +90</option>
<option value="+1868" data-bmd-placeholder="(868) 291-1234">TT +1868</option>
<option value="+688" data-bmd-placeholder="90 1234">TV +688</option>
<option value="+886" data-bmd-placeholder="0912 345 678">TW +886</option>
<option value="+255" data-bmd-placeholder="0621 234 567">TZ +255</option>
<option value="+380" data-bmd-placeholder="050 123 4567">UA +380</option>
<option value="+256" data-bmd-placeholder="0712 345678">UG +256</option>
<option value="+1" data-bmd-placeholder="(201) 555-0123">US +1</option>
<option value="+598" data-bmd-placeholder="094 231 234">UY +598</option>
<option value="+998" data-bmd-placeholder="91 234 56 78">UZ +998</option>
<option value="+379" data-bmd-placeholder="312 345 6789">VA +379</option>
<option value="+1784" data-bmd-placeholder="(784) 430-1234">VC +1784</option>
<option value="+58" data-bmd-placeholder="0412-1234567">VE +58</option>
<option value="+1284" data-bmd-placeholder="(284) 300-1234">VG +1284</option>
<option value="+1340" data-bmd-placeholder="(340) 642-1234">VI +1340</option>
<option value="+84" data-bmd-placeholder="0912 345 678">VN +84</option>
<option value="+678" data-bmd-placeholder="591 2345">VU +678</option>
<option value="+681" data-bmd-placeholder="82 12 34">WF +681</option>
<option value="+685" data-bmd-placeholder="72 12345">WS +685</option>
<option value="+383" data-bmd-placeholder="043 201 234">XK +383</option>
<option value="+967" data-bmd-placeholder="0712 345 678">YE +967</option>
<option value="+262" data-bmd-placeholder="0639 01 23 45">YT +262</option>
<option value="+27" data-bmd-placeholder="071 123 4567">ZA +27</option>
<option value="+260" data-bmd-placeholder="095 5123456">ZM +260</option>
<option value="+263" data-bmd-placeholder="071 234 5678">ZW +263</option>
`;

test("Case 2 (lower case country code)", () => {
	expect(
		beautify(createCountryCallingCodeOptions("bd", []), { format: "html" }),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});

// Case 3 (restrict available country codes)

const expectedTemplate3 = `
<option value="+880" data-bmd-placeholder="1812-345678">BD +880</option>
<option value="+44" selected data-bmd-placeholder="07400 123456">GB +44</option>
<option value="+1" data-bmd-placeholder="(201) 555-0123">US +1</option>
`;

test("Case 3 (restrict available country codes)", () => {
	expect(
		beautify(createCountryCallingCodeOptions("Gb", ["bd", "gb", "US"]), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate3, { format: "html" }));
});

// Case 4 (restrict available country codes, selected one not available)

const expectedTemplate4 = `
<option value="+65" selected data-bmd-placeholder="8123 4567">SG +65</option>
<option value="+44" data-bmd-placeholder="07400 123456">GB +44</option>
<option value="+880" data-bmd-placeholder="1812-345678">BD +880</option>
<option value="+1" data-bmd-placeholder="(201) 555-0123">US +1</option>
`;

test("Case 4 (restrict available country codes, selected one not available)", () => {
	expect(
		beautify(createCountryCallingCodeOptions("SG", ["GB", "BD", "US"]), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate4, { format: "html" }));
});

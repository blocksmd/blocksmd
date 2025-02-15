"use strict";

const placeholdersAndCallingCodes = {
	AC: { placeholder: "40123", callingCode: "+247" },
	AD: { placeholder: "312 345", callingCode: "+376" },
	AE: { placeholder: "050 123 4567", callingCode: "+971" },
	AF: { placeholder: "070 123 4567", callingCode: "+93" },
	AG: { placeholder: "(268) 464-1234", callingCode: "+1268" },
	AI: { placeholder: "(264) 235-1234", callingCode: "+1264" },
	AL: { placeholder: "067 212 3456", callingCode: "+355" },
	AM: { placeholder: "077 123456", callingCode: "+374" },
	AN: { placeholder: "", callingCode: "+599" },
	AO: { placeholder: "923 123 456", callingCode: "+244" },
	AQ: { placeholder: "", callingCode: "+672" },
	AR: { placeholder: "011 15-2345-6789", callingCode: "+54" },
	AS: { placeholder: "(684) 733-1234", callingCode: "+1684" },
	AT: { placeholder: "0664 123456", callingCode: "+43" },
	AU: { placeholder: "0412 345 678", callingCode: "+61" },
	AW: { placeholder: "560 1234", callingCode: "+297" },
	AX: { placeholder: "041 2345678", callingCode: "+358" },
	AZ: { placeholder: "040 123 45 67", callingCode: "+994" },
	BA: { placeholder: "061 123 456", callingCode: "+387" },
	BB: { placeholder: "(246) 250-1234", callingCode: "+1246" },
	BD: { placeholder: "01812-345678", callingCode: "+880" },
	BE: { placeholder: "0470 12 34 56", callingCode: "+32" },
	BF: { placeholder: "70 12 34 56", callingCode: "+226" },
	BG: { placeholder: "043 012 345", callingCode: "+359" },
	BH: { placeholder: "3600 1234", callingCode: "+973" },
	BI: { placeholder: "79 56 12 34", callingCode: "+257" },
	BJ: { placeholder: "90 01 12 34", callingCode: "+229" },
	BL: { placeholder: "0690 00 12 34", callingCode: "+590" },
	BM: { placeholder: "(441) 370-1234", callingCode: "+1441" },
	BN: { placeholder: "712 3456", callingCode: "+673" },
	BO: { placeholder: "71234567", callingCode: "+591" },
	BQ: { placeholder: "318 1234", callingCode: "+599" },
	BR: { placeholder: "(11) 96123-4567", callingCode: "+55" },
	BS: { placeholder: "(242) 359-1234", callingCode: "+1242" },
	BT: { placeholder: "17 12 34 56", callingCode: "+975" },
	BW: { placeholder: "71 123 456", callingCode: "+267" },
	BY: { placeholder: "8 029 491-19-11", callingCode: "+375" },
	BZ: { placeholder: "622-1234", callingCode: "+501" },
	CA: { placeholder: "(506) 234-5678", callingCode: "+1" },
	CC: { placeholder: "0412 345 678", callingCode: "+61" },
	CD: { placeholder: "0991 234 567", callingCode: "+243" },
	CF: { placeholder: "70 01 23 45", callingCode: "+236" },
	CG: { placeholder: "06 123 4567", callingCode: "+242" },
	CH: { placeholder: "078 123 45 67", callingCode: "+41" },
	CI: { placeholder: "01 23 45 6789", callingCode: "+225" },
	CK: { placeholder: "71 234", callingCode: "+682" },
	CL: { placeholder: "(2) 2123 4567", callingCode: "+56" },
	CM: { placeholder: "6 71 23 45 67", callingCode: "+237" },
	CN: { placeholder: "131 2345 6789", callingCode: "+86" },
	CO: { placeholder: "321 1234567", callingCode: "+57" },
	CR: { placeholder: "8312 3456", callingCode: "+506" },
	CU: { placeholder: "05 1234567", callingCode: "+53" },
	CV: { placeholder: "991 12 34", callingCode: "+238" },
	CW: { placeholder: "9 518 1234", callingCode: "+599" },
	CX: { placeholder: "0412 345 678", callingCode: "+61" },
	CY: { placeholder: "96 123456", callingCode: "+357" },
	CZ: { placeholder: "601 123 456", callingCode: "+420" },
	DE: { placeholder: "01512 3456789", callingCode: "+49" },
	DJ: { placeholder: "77 83 10 01", callingCode: "+253" },
	DK: { placeholder: "34 41 23 45", callingCode: "+45" },
	DM: { placeholder: "(767) 225-1234", callingCode: "+1767" },
	DO: { placeholder: "(809) 234-5678", callingCode: "+1849" },
	DZ: { placeholder: "0551 23 45 67", callingCode: "+213" },
	EC: { placeholder: "099 123 4567", callingCode: "+593" },
	EE: { placeholder: "5123 4567", callingCode: "+372" },
	EG: { placeholder: "010 01234567", callingCode: "+20" },
	EH: { placeholder: "0650-123456", callingCode: "+212" },
	ER: { placeholder: "07 123 456", callingCode: "+291" },
	ES: { placeholder: "612 34 56 78", callingCode: "+34" },
	ET: { placeholder: "091 123 4567", callingCode: "+251" },
	FI: { placeholder: "041 2345678", callingCode: "+358" },
	FJ: { placeholder: "701 2345", callingCode: "+679" },
	FK: { placeholder: "51234", callingCode: "+500" },
	FM: { placeholder: "350 1234", callingCode: "+691" },
	FO: { placeholder: "211234", callingCode: "+298" },
	FR: { placeholder: "06 12 34 56 78", callingCode: "+33" },
	GA: { placeholder: "06 03 12 34", callingCode: "+241" },
	GB: { placeholder: "07400 123456", callingCode: "+44" },
	GD: { placeholder: "(473) 403-1234", callingCode: "+1473" },
	GE: { placeholder: "555 12 34 56", callingCode: "+995" },
	GF: { placeholder: "0694 20 12 34", callingCode: "+594" },
	GG: { placeholder: "07781 123456", callingCode: "+44" },
	GH: { placeholder: "023 123 4567", callingCode: "+233" },
	GI: { placeholder: "57123456", callingCode: "+350" },
	GL: { placeholder: "22 12 34", callingCode: "+299" },
	GM: { placeholder: "301 2345", callingCode: "+220" },
	GN: { placeholder: "601 12 34 56", callingCode: "+224" },
	GP: { placeholder: "0690 00 12 34", callingCode: "+590" },
	GQ: { placeholder: "222 123 456", callingCode: "+240" },
	GR: { placeholder: "691 234 5678", callingCode: "+30" },
	GS: { placeholder: "", callingCode: "+500" },
	GT: { placeholder: "5123 4567", callingCode: "+502" },
	GU: { placeholder: "(671) 300-1234", callingCode: "+1671" },
	GW: { placeholder: "955 012 345", callingCode: "+245" },
	GY: { placeholder: "609 1234", callingCode: "+595" },
	HK: { placeholder: "5123 4567", callingCode: "+852" },
	HM: { placeholder: "", callingCode: "+672" },
	HN: { placeholder: "9123-4567", callingCode: "+504" },
	HR: { placeholder: "092 123 4567", callingCode: "+385" },
	HT: { placeholder: "34 10 1234", callingCode: "+509" },
	HU: { placeholder: "06 20 123 4567", callingCode: "+36" },
	ID: { placeholder: "0812-345-678", callingCode: "+62" },
	IE: { placeholder: "085 012 3456", callingCode: "+353" },
	IL: { placeholder: "050-234-5678", callingCode: "+972" },
	IM: { placeholder: "07924 123456", callingCode: "+44" },
	IN: { placeholder: "081234 56789", callingCode: "+91" },
	IO: { placeholder: "380 1234", callingCode: "+246" },
	IQ: { placeholder: "0791 234 5678", callingCode: "+964" },
	IR: { placeholder: "0912 345 6789", callingCode: "+98" },
	IS: { placeholder: "611 1234", callingCode: "+354" },
	IT: { placeholder: "312 345 6789", callingCode: "+39" },
	JE: { placeholder: "07797 712345", callingCode: "+44" },
	JM: { placeholder: "(876) 210-1234", callingCode: "+1876" },
	JO: { placeholder: "07 9012 3456", callingCode: "+962" },
	JP: { placeholder: "090-1234-5678", callingCode: "+81" },
	KE: { placeholder: "0712 123456", callingCode: "+254" },
	KG: { placeholder: "0700 123 456", callingCode: "+996" },
	KH: { placeholder: "091 234 567", callingCode: "+855" },
	KI: { placeholder: "72001234", callingCode: "+686" },
	KM: { placeholder: "321 23 45", callingCode: "+269" },
	KN: { placeholder: "(869) 765-2917", callingCode: "+1869" },
	KP: { placeholder: "0192 123 4567", callingCode: "+850" },
	KR: { placeholder: "010-2000-0000", callingCode: "+82" },
	KW: { placeholder: "500 12345", callingCode: "+965" },
	KY: { placeholder: "(345) 323-1234", callingCode: "+ 345" },
	KZ: { placeholder: "8 (771) 000 9998", callingCode: "+77" },
	LA: { placeholder: "020 23 123 456", callingCode: "+856" },
	LB: { placeholder: "71 123 456", callingCode: "+961" },
	LC: { placeholder: "(758) 284-5678", callingCode: "+1758" },
	LI: { placeholder: "660 234 567", callingCode: "+423" },
	LK: { placeholder: "071 234 5678", callingCode: "+94" },
	LR: { placeholder: "077 012 3456", callingCode: "+231" },
	LS: { placeholder: "5012 3456", callingCode: "+266" },
	LT: { placeholder: "(0-612) 34567", callingCode: "+370" },
	LU: { placeholder: "628 123 456", callingCode: "+352" },
	LV: { placeholder: "21 234 567", callingCode: "+371" },
	LY: { placeholder: "091-2345678", callingCode: "+218" },
	MA: { placeholder: "0650-123456", callingCode: "+212" },
	MC: { placeholder: "06 12 34 56 78", callingCode: "+377" },
	MD: { placeholder: "0621 12 345", callingCode: "+373" },
	ME: { placeholder: "067 622 901", callingCode: "+382" },
	MF: { placeholder: "0690 00 12 34", callingCode: "+590" },
	MG: { placeholder: "032 12 345 67", callingCode: "+261" },
	MH: { placeholder: "235-1234", callingCode: "+692" },
	MK: { placeholder: "072 345 678", callingCode: "+389" },
	ML: { placeholder: "65 01 23 45", callingCode: "+223" },
	MM: { placeholder: "09 212 3456", callingCode: "+95" },
	MN: { placeholder: "8812 3456", callingCode: "+976" },
	MO: { placeholder: "6612 3456", callingCode: "+853" },
	MP: { placeholder: "(670) 234-5678", callingCode: "+1670" },
	MQ: { placeholder: "0696 20 12 34", callingCode: "+596" },
	MR: { placeholder: "22 12 34 56", callingCode: "+222" },
	MS: { placeholder: "(664) 492-3456", callingCode: "+1664" },
	MT: { placeholder: "9696 1234", callingCode: "+356" },
	MU: { placeholder: "5251 2345", callingCode: "+230" },
	MV: { placeholder: "771-2345", callingCode: "+960" },
	MW: { placeholder: "0991 23 45 67", callingCode: "+265" },
	MX: { placeholder: "222 123 4567", callingCode: "+52" },
	MY: { placeholder: "012-345 6789", callingCode: "+60" },
	MZ: { placeholder: "82 123 4567", callingCode: "+258" },
	NA: { placeholder: "081 123 4567", callingCode: "+264" },
	NC: { placeholder: "75.12.34", callingCode: "+687" },
	NE: { placeholder: "93 12 34 56", callingCode: "+227" },
	NF: { placeholder: "3 81234", callingCode: "+672" },
	NG: { placeholder: "0802 123 4567", callingCode: "+234" },
	NI: { placeholder: "8123 4567", callingCode: "+505" },
	NL: { placeholder: "06 12345678", callingCode: "+31" },
	NO: { placeholder: "40 61 23 45", callingCode: "+47" },
	NP: { placeholder: "984-1234567", callingCode: "+977" },
	NR: { placeholder: "555 1234", callingCode: "+674" },
	NU: { placeholder: "888 4012", callingCode: "+683" },
	NZ: { placeholder: "021 123 4567", callingCode: "+64" },
	OM: { placeholder: "9212 3456", callingCode: "+968" },
	PA: { placeholder: "6123-4567", callingCode: "+507" },
	PE: { placeholder: "912 345 678", callingCode: "+51" },
	PF: { placeholder: "87 12 34 56", callingCode: "+689" },
	PG: { placeholder: "7012 3456", callingCode: "+675" },
	PH: { placeholder: "0905 123 4567", callingCode: "+63" },
	PK: { placeholder: "0301 2345678", callingCode: "+92" },
	PL: { placeholder: "512 345 678", callingCode: "+48" },
	PM: { placeholder: "055 12 34", callingCode: "+508" },
	PN: { placeholder: "", callingCode: "+872" },
	PR: { placeholder: "(787) 234-5678", callingCode: "+1939" },
	PS: { placeholder: "0599 123 456", callingCode: "+970" },
	PT: { placeholder: "912 345 678", callingCode: "+351" },
	PW: { placeholder: "620 1234", callingCode: "+680" },
	PY: { placeholder: "0961 456789", callingCode: "+595" },
	QA: { placeholder: "3312 3456", callingCode: "+974" },
	RE: { placeholder: "0692 12 34 56", callingCode: "+262" },
	RO: { placeholder: "0712 034 567", callingCode: "+40" },
	RS: { placeholder: "060 1234567", callingCode: "+381" },
	RU: { placeholder: "8 (912) 345-67-89", callingCode: "+7" },
	RW: { placeholder: "0720 123 456", callingCode: "+250" },
	SA: { placeholder: "051 234 5678", callingCode: "+966" },
	SB: { placeholder: "74 21234", callingCode: "+677" },
	SC: { placeholder: "2 510 123", callingCode: "+248" },
	SD: { placeholder: "091 123 1234", callingCode: "+249" },
	SE: { placeholder: "070-123 45 67", callingCode: "+46" },
	SG: { placeholder: "8123 4567", callingCode: "+65" },
	SH: { placeholder: "51234", callingCode: "+290" },
	SI: { placeholder: "031 234 567", callingCode: "+386" },
	SJ: { placeholder: "41 23 45 67", callingCode: "+47" },
	SK: { placeholder: "0912 123 456", callingCode: "+421" },
	SL: { placeholder: "(025) 123456", callingCode: "+232" },
	SM: { placeholder: "66 66 12 12", callingCode: "+378" },
	SN: { placeholder: "70 123 45 67", callingCode: "+221" },
	SO: { placeholder: "7 1123456", callingCode: "+252" },
	SR: { placeholder: "741-2345", callingCode: "+597" },
	SS: { placeholder: "0977 123 456", callingCode: "+211" },
	ST: { placeholder: "981 2345", callingCode: "+239" },
	SV: { placeholder: "7012 3456", callingCode: "+503" },
	SX: { placeholder: "(721) 520-5678", callingCode: "+1" },
	SY: { placeholder: "0944 567 890", callingCode: "+963" },
	SZ: { placeholder: "7612 3456", callingCode: "+268" },
	TA: { placeholder: "8999", callingCode: "+290" },
	TC: { placeholder: "(649) 231-1234", callingCode: "+1649" },
	TD: { placeholder: "63 01 23 45", callingCode: "+235" },
	TF: { placeholder: "", callingCode: "+262" },
	TG: { placeholder: "90 11 23 45", callingCode: "+228" },
	TH: { placeholder: "081 234 5678", callingCode: "+66" },
	TJ: { placeholder: "91 712 3456", callingCode: "+992" },
	TK: { placeholder: "7290", callingCode: "+690" },
	TL: { placeholder: "7721 2345", callingCode: "+670" },
	TM: { placeholder: "8 66 123456", callingCode: "+993" },
	TN: { placeholder: "20 123 456", callingCode: "+216" },
	TO: { placeholder: "771 5123", callingCode: "+676" },
	TR: { placeholder: "0501 234 56 78", callingCode: "+90" },
	TT: { placeholder: "(868) 291-1234", callingCode: "+1868" },
	TV: { placeholder: "90 1234", callingCode: "+688" },
	TW: { placeholder: "0912 345 678", callingCode: "+886" },
	TZ: { placeholder: "0621 234 567", callingCode: "+255" },
	UA: { placeholder: "050 123 4567", callingCode: "+380" },
	UG: { placeholder: "0712 345678", callingCode: "+256" },
	US: { placeholder: "(201) 555-0123", callingCode: "+1" },
	UY: { placeholder: "094 231 234", callingCode: "+598" },
	UZ: { placeholder: "91 234 56 78", callingCode: "+998" },
	VA: { placeholder: "312 345 6789", callingCode: "+379" },
	VC: { placeholder: "(784) 430-1234", callingCode: "+1784" },
	VE: { placeholder: "0412-1234567", callingCode: "+58" },
	VG: { placeholder: "(284) 300-1234", callingCode: "+1284" },
	VI: { placeholder: "(340) 642-1234", callingCode: "+1340" },
	VN: { placeholder: "0912 345 678", callingCode: "+84" },
	VU: { placeholder: "591 2345", callingCode: "+678" },
	WF: { placeholder: "82 12 34", callingCode: "+681" },
	WS: { placeholder: "72 12345", callingCode: "+685" },
	XK: { placeholder: "043 201 234", callingCode: "+383" },
	YE: { placeholder: "0712 345 678", callingCode: "+967" },
	YT: { placeholder: "0639 01 23 45", callingCode: "+262" },
	ZA: { placeholder: "071 123 4567", callingCode: "+27" },
	ZM: { placeholder: "095 5123456", callingCode: "+260" },
	ZW: { placeholder: "071 234 5678", callingCode: "+263" },
};

/**
 * Given a country code, get the correct phone number placeholder.
 *
 * @param {string} countryCode
 * @returns {string}
 */
function getPhoneNumberPlaceholder(countryCode) {
	// Fallback country code is "US"
	countryCode = countryCode.toUpperCase();
	if (placeholdersAndCallingCodes[countryCode] === undefined) {
		countryCode = "US";
	}
	return placeholdersAndCallingCodes[countryCode].placeholder || "";
}

/**
 * Create <option> elements for selecting a country calling code.
 *
 * @param {string} selectedCountryCode
 * @param {Array.<string>} availableCountryCodes
 * @returns {string}
 */
function createCountryCallingCodeOptions(
	selectedCountryCode,
	availableCountryCodes,
) {
	// Fallback country code is "US"
	selectedCountryCode = selectedCountryCode.toUpperCase();
	if (placeholdersAndCallingCodes[selectedCountryCode] === undefined) {
		selectedCountryCode = "US";
	}

	// If available country codes are not set (empty array), then use all
	const available = [];
	if (availableCountryCodes.length === 0) {
		for (const key of Object.keys(placeholdersAndCallingCodes)) {
			available.push(key);
		}
	} else {
		for (const key of availableCountryCodes) {
			available.push(key.toUpperCase().trim());
		}
	}

	// Make sure selected country code is always available
	if (!available.includes(selectedCountryCode)) {
		available.unshift(selectedCountryCode);
	}

	// Create the options
	const options = [];
	for (const country of available) {
		if (placeholdersAndCallingCodes[country] !== undefined) {
			const callingCode = placeholdersAndCallingCodes[country].callingCode;
			const placeholder = placeholdersAndCallingCodes[country].placeholder;
			const selected = country === selectedCountryCode ? " selected" : "";
			options.push(
				`<option value="${country} ${callingCode}"${selected} data-fmd-placeholder="${placeholder}">${country}</option>`,
			);
		}
	}
	return options.join("\n");
}

exports.placeholdersAndCallingCodes = placeholdersAndCallingCodes;
exports.getPhoneNumberPlaceholder = getPhoneNumberPlaceholder;
exports.createCountryCallingCodeOptions = createCountryCallingCodeOptions;

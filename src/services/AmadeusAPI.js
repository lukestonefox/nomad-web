"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = exports.fetchHotels = void 0;
var axios_1 = require("axios");
var apiKey_1 = require("../apiKey");
var amadeus_1 = require("amadeus");
var amadeus = new amadeus_1.default({
    clientId: '7wnPtijdpWOqputu9aAmhqRgHPnOhRKE',
    clientSecret: 'L2DrxNqvW7NM2UfZ'
});
var fetchHotels = function (location) { return __awaiter(void 0, void 0, void 0, function () {
    var coordinates, response, data, hotels, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, exports.getCoordinates)(location)];
            case 1:
                coordinates = _a.sent();
                return [4 /*yield*/, amadeus.shopping.hotelOffers.get({
                        latitude: coordinates.lat,
                        longitude: coordinates.lng,
                        radius: 5, // Radius in km
                    })];
            case 2:
                response = _a.sent();
                data = response.data;
                console.log('Fetched Hotels:', data);
                hotels = data.map(function (hotelOffer) {
                    var hotel = hotelOffer.hotel;
                    var imageUrl = hotel.media && hotel.media.length > 0 ? hotel.media[0].uri : '';
                    var rating = hotel.rating ? hotel.rating : 0;
                    var price = hotelOffer.offers && hotelOffer.offers.length > 0 ? hotelOffer.offers[0].price.total : '';
                    return {
                        imageUrl: imageUrl,
                        name: hotel.name,
                        vicinity: hotel.address.lines.join(', '),
                        rating: rating,
                        price: price
                    };
                });
                return [2 /*return*/, hotels];
            case 3:
                error_1 = _a.sent();
                console.error('Error fetching hotels:', error_1);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.fetchHotels = fetchHotels;
var getCoordinates = function (location) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, lat, lng;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, axios_1.default.get("/api/maps/api/geocode/json", {
                    params: {
                        address: location,
                        key: apiKey_1.API_KEY,
                    },
                })];
            case 1:
                response = _b.sent();
                if (response.data.status === 'OK') {
                    _a = response.data.results[0].geometry.location, lat = _a.lat, lng = _a.lng;
                    return [2 /*return*/, { lat: lat, lng: lng }];
                }
                else {
                    throw new Error('Geocoding API failed');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getCoordinates = getCoordinates;

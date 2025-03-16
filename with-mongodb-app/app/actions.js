"use strict";
"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDatabaseConnection = testDatabaseConnection;
const mongodb_1 = __importDefault(require("@/lib/mongodb"));
function testDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        let isConnected = false;
        try {
            const mongoClient = yield mongodb_1.default.connect();
            // Send a ping to confirm a successful connection
            yield mongoClient.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!"); // because this is a server action, the console.log will be outputted to your terminal not in the browser
            return !isConnected;
        }
        catch (e) {
            console.error(e);
            return isConnected;
        }
    });
}

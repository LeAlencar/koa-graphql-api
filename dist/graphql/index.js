"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDefinitions = exports.connectionArgs = exports.getDataloaders = exports.registerLoader = void 0;
var loaderRegister_1 = require("./loaderRegister");
Object.defineProperty(exports, "registerLoader", { enumerable: true, get: function () { return loaderRegister_1.registerLoader; } });
Object.defineProperty(exports, "getDataloaders", { enumerable: true, get: function () { return loaderRegister_1.getDataloaders; } });
var connectionDefinitions_1 = require("./connectionDefinitions");
Object.defineProperty(exports, "connectionArgs", { enumerable: true, get: function () { return connectionDefinitions_1.connectionArgs; } });
Object.defineProperty(exports, "connectionDefinitions", { enumerable: true, get: function () { return connectionDefinitions_1.connectionDefinitions; } });

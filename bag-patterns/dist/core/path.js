"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
class Path {
    commands = [];
    moveTo(p) {
        this.commands.push(`M ${p.x} ${p.y}`);
        return this;
    }
    lineTo(p) {
        this.commands.push(`L ${p.x} ${p.y}`);
        return this;
    }
    arcTo(p, radius) {
        // Basic arc implementation - we can improve this later
        this.commands.push(`A ${radius} ${radius} 0 0 1 ${p.x} ${p.y}`);
        return this;
    }
    closePath() {
        this.commands.push("Z");
        return this;
    }
    toString() {
        return this.commands.join(" ");
    }
}
exports.Path = Path;

const ConvertLinearScale = (CurrentValue, fromRange, toRange) => {
    try {
        const [fromMin, fromMax] = fromRange;
        const [toMin, toMax] = toRange;

        const percent = (CurrentValue - fromMin) / (fromMax - fromMin);
        const output = percent * (toMax - toMin) + toMin;
        if (isNaN(output) || output === Infinity || output === -Infinity) return 0;
        return output;
    } catch (err) {
        return 0;
    }
};

export default {
    ConvertLinearScale: ConvertLinearScale
};
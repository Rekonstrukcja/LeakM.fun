export default {
    name: "ShowCoords",
    desc: "Trigger, który pokazuje współrzędne gracza w konsoli",
    code: `
    -- LeakM.fun
local ped = PlayerPedId()
local coords = GetEntityCoords(ped)
print(string.format("^2[LeakM.fun]^0 X: %.2f, Y: %.2f, Z: %.2f", coords.x, coords.y, coords.z))


`.trim()
};

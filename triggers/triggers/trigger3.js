export default {
    name: "Cordy Teleport",
    desc: "Teleport na wpisane koordynaty",
    code: `
    
-- LeakM.fun

local function TeleportToCoords(x, y, z)

    local playerPed = PlayerPedId()
    SetEntityCoords(playerPed, x, y, z, false, false, false, true)
    print(string.format("Teleportowano na współrzędne: X: %.2f, Y: %.2f, Z: %.2f", x, y, z))
end

local targetX, targetY, targetZ = 245.62, 370.71, 104.74, 154.71 -- tutaj wpierdalasz kordy
TeleportToCoords(targetX, targetY, targetZ)
    


`.trim()
};

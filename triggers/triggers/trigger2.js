export default {
    name: "Otwieranie pojazdu",
    desc: "Otwieranie wszelkich pojazdów zamkniętych w pobliżu gracza",
    code: `
    
-- LeakM.fun

local function UnlockNearbyVehicles()
    local playerPed = PlayerPedId()
    local playerPos = GetEntityCoords(playerPed)

    local radius = 5.0 -- tutaj mozecie zmienic promien na wiekszy

    local vehicles = GetGamePool('CVehicle')

    for _, vehicle in ipairs(vehicles) do
        local vehiclePos = GetEntityCoords(vehicle)
        local distance = #(vehiclePos - playerPos)

        if distance <= radius then
            SetVehicleDoorsLocked(vehicle, 1)
            SetVehicleDoorsLockedForAllPlayers(vehicle, false)
            print("Odblokowano pojazd", vehicle)
        end
    end
end

UnlockNearbyVehicles()



`.trim()
};

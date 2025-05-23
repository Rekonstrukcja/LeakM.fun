export default {
    name: "ExitCar",
    desc: "Siła wyrzuca gracza (nas), z samochodu",
    code: `
    -- LeakM.fun
    local ped = PlayerPedId()
if IsPedInAnyVehicle(ped, false) then
    TaskLeaveVehicle(ped, GetVehiclePedIsIn(ped, false), 0)
end


`.trim()
};

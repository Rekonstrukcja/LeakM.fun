export default {
    name: "Statystyki",
    desc: "Maxuje statystyki gracza, działało na serwerze StollicaRP",
    code: `
    
-- LeakM.fun
    TriggerServerEvent('vms_gym:sv:setTaken', 1, 8, true)
    TriggerServerEvent('vms_gym:sv:addValue', "strenght", 100)
    TriggerServerEvent('vms_gym:sv:setTaken', 1, 1, true)
    TriggerServerEvent('vms_gym:sv:addValue', "condition", 100)
    


`.trim()
};

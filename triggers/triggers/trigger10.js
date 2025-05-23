export default {
    name: "ObjectESP",
    desc: "Podświetla obiekty na mapie. Wystarczy podać hash propa.",
    code: `
    -- LeakM.fun
local targetProps = {
    582024072, -- bzzz_plants_weed_blue_bud_big
    -79244875, -- bzzz_plants_weed_green_bud_big
    1237738930 -- bzzz_plants_weed_cyan_bud_big
}

Citizen.CreateThread(function()
    while true do
        Wait(0)
        for _, obj in ipairs(GetGamePool("CObject")) do
            local model = GetEntityModel(obj)
            for _, hash in ipairs(targetProps) do
                if model == hash then
                    SetEntityAlpha(obj, 200, false)
                    SetEntityCompletelyDisableCollision(obj, false, false)
                    SetEntityDrawOutline(obj, true)
                    SetEntityNoCollisionEntity(obj, PlayerPedId(), false)
                    SetEntityLocallyVisible(obj)
                end
            end
        end
    end
end)


`.trim()
};

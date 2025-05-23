export default {
    name: "Szukanie propoów",
    desc: "Szukanie propów na mapie, gdy znajdzie propa, pojawi się nad nim tekst z nawą propa.",
    code: `
    
-- LeakM.fun
Citizen.CreateThread(function()
    -- TUTAJ DAJECIE LISTE PROPOW JAKIE MA SZUKAC
    local propsToFind = {
        "prop_michael_backpack",
        "bkr_prop_duffel_bag_01a",
        "prop_cs_heist_bag_02",
        "v_club_vu_djbag",
        "prop_cs_shopping_bag",
        "prop_nigel_bag_pickup",
        "prop_stat_pack_01",
        "hei_heist_acc_box_trinket_02",
        "prop_cs_cardbox_01"
    }

    local propHashes = {}
    for _, propName in ipairs(propsToFind) do
        table.insert(propHashes, GetHashKey(propName))
    end

    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(0)

            local playerCoords = GetEntityCoords(PlayerPedId())

            local handle, object = FindFirstObject()
            local success

            repeat
                local objectModel = GetEntityModel(object)
                for _, hash in ipairs(propHashes) do
                    if objectModel == hash then
                        local propCoords = GetEntityCoords(object)
                        local distance = #(playerCoords - propCoords)


                        if distance < 100.0 then
                            DrawMarker(
                                1, 
                                propCoords.x, propCoords.y, propCoords.z + 1.0,
                                0.0, 0.0, 0.0,
                                0.0, 0.0, 0.0,
                                0.2, 0.2, 0.2,
                                255, 0, 0, 150,
                                false,
                                true,
                                2, 
                                nil, nil, false 
                            )


                            DrawText3D(propCoords.x, propCoords.y, propCoords.z + 1.5, propsToFind[_])
                        end
                    end
                end

                success, object = FindNextObject(handle)
            until not success

            EndFindObject(handle)
        end
    end)
end)


function DrawText3D(x, y, z, text)
    local onScreen, _x, _y = World3dToScreen2d(x, y, z)
    local px, py, pz = table.unpack(GetGameplayCamCoords())

    if onScreen then
        SetTextScale(0.35, 0.35)
        SetTextFont(4)
        SetTextProportional(1)
        SetTextColour(255, 255, 255, 215)
        SetTextEntry("STRING")
        SetTextCentre(1)
        AddTextComponentString(text)
        DrawText(_x, _y)
    end
end
    


`.trim()
};

export default {
    name: "PropSearch",
    desc: "Wyszukuje propów wokół gracza i wypisuje ich nazwy w konsoli",
    code: `
    -- LeakM.fun
Citizen.CreateThread(function()
    local ped = PlayerPedId()
    local coords = GetEntityCoords(ped)
    local radius = 10.0 -- tutaj wpisujecie jaki ma być promień szukania

    local count = 0
    for _, obj in ipairs(GetGamePool("CObject")) do
        local objCoords = GetEntityCoords(obj)
        local dist = #(coords - objCoords)
        if dist <= radius then
            local model = GetEntityModel(obj)
            local name = tostring(GetDisplayNameFromVehicleModel(model)) -- fallback
            if IsModelValid(model) then
                name = tostring(GetLabelText(GetDisplayNameFromVehicleModel(model)))
                local modelName = string.lower(GetEntityArchetypeName(obj) or "unknown")
                print("^2[LeakM.fun]^0 Model hash: " .. model .. " | Nazwa (archetype): " .. modelName)
                count = count + 1
            end
        end
    end

    print("^2[LeakM.fun]^0 Znaleziono " .. count .. " propów w promieniu 10.")
end)


`.trim()
};

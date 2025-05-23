export default {
    name: "Search NPC",
    desc: "Szukanie NPC za pomocą modelu",
    code: `

-- LeakM.fun
Citizen.CreateThread(function()
    local npcModelHash = GetHashKey("g_f_y_ballas_01") -- Tutaj wpierdalacie nazwe npc!
    
    local handle, ped = FindFirstPed()
    local success = true

    while success do
        if IsPedModel(ped, npcModelHash) then
            local npcCoords = GetEntityCoords(ped)
            print(string.format("LeakM.pl | Znaleziono NPC, kordy:: x: %.2f, y: %.2f, z: %.2f", npcCoords.x, npcCoords.y, npcCoords.z))
            
            EndFindPed(handle)
            return
        end

        success, ped = FindNextPed(handle)
    end

    EndFindPed(handle)
    print("LeakM.pl | Nie udało się znalezc npc.")
end)
`.trim()
};

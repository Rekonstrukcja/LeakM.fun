export default {
    name: "GPS",
    desc: "Zaznaczanie lokalizacji GPS na podstawie koordynatów",
    code: `
    
-- LeakM.fun

function setGPS(x, y, z)
    SetNewWaypoint(x, y)
    if z then
    end
end

-- TUTAJ KORDY
local x, y, z = 523.61, -861.31, 16.52


setGPS(x, y, z)
    


`.trim()
};

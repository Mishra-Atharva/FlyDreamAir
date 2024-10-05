# Path to the JSON file (adjust this @Liquid to be your json file)
$jsonFilePath = "C:../user.json"

# Example of new data to add (you can replace this with a parameterized input)
$newData = @{
    key = "updated_value"
    anotherKey = "another_updated_value"
}

# Read the current JSON file
$jsonContent = Get-Content $jsonFilePath -Raw | ConvertFrom-Json

# Merge new data into existing JSON
foreach ($key in $newData.Keys) {
    $jsonContent.$key = $newData[$key]
}

# Save updated JSON back to the file
$jsonContent | ConvertTo-Json -Depth 10 | Set-Content $jsonFilePath

Write-Host "JSON file updated successfully!"
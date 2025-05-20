# Convert CRLF to LF for all text files
# Exclude binary files and node_modules

$basePath = Get-Location
$extensions = @("*.ts", "*.tsx", "*.js", "*.jsx", "*.json", "*.css", "*.html", "*.md", "*.svg", "*.yml", "*.yaml")
$excludeDirs = @("node_modules", "dist", "obj", "bin")

function ConvertToLF {
    param (
        [string]$filePath
    )
    
    # Skip binary files
    $isBinary = $false
    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
    $binaryExts = @(".png", ".jpg", ".jpeg", ".gif", ".ico", ".mov", ".mp4", ".mp3", ".flv", ".fla", ".swf", ".gz", ".zip", ".7z", ".ttf", ".eot", ".woff", ".woff2", ".pyc", ".pdf", ".ez", ".bz2", ".dll", ".exe")
    
    if ($binaryExts -contains $ext) {
        $isBinary = $true
    }
    
    if (-not $isBinary) {
        try {
            $content = [System.IO.File]::ReadAllText($filePath)
            # Replace CRLF with LF
            $content = $content -replace "`r`n", "`n"
            [System.IO.File]::WriteAllText($filePath, $content)
            Write-Host "Converted: $filePath"
        }
        catch {
            Write-Host "Error processing $filePath`: $_"
        }
    }
}

foreach ($ext in $extensions) {
    Get-ChildItem -Path $basePath -Filter $ext -Recurse | ForEach-Object {
        # Skip files in excluded directories
        $skip = $false
        foreach ($dir in $excludeDirs) {
            if ($_.FullName -like "*\$dir\*") {
                $skip = $true
                break
            }
        }
        
        if (-not $skip) {
            ConvertToLF -filePath $_.FullName
        }
    }
}

Write-Host "Conversion complete!"

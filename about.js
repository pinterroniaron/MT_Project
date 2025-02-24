let activeDescription = null;

        function showDescription(index) {
            if (activeDescription) {
                activeDescription.style.opacity = '0';
                activeDescription.style.bottom = '-50px';
            }
            
            const descriptions = document.querySelectorAll('.description');
            activeDescription = descriptions[index];
            activeDescription.style.opacity = '1';
            activeDescription.style.bottom = '-70px';
        }

        function hideDescription(index) {
            const descriptions = document.querySelectorAll('.description');
            descriptions[index].style.opacity = '0';
            descriptions[index].style.bottom = '-50px';
        }
var nodes = new vis.DataSet([]);
        var edges = new vis.DataSet([]);
        var container = document.getElementById('network');
        var data = { nodes: nodes, edges: edges };
        var options = {};
        var network = new vis.Network(container, data, options);
        let nodeId = 2;

        function setSubject() {
            let subject = document.getElementById('subject').value.trim();
            if (subject === '') return;

            nodes.clear();
            edges.clear();
            nodes.add({ id: 1, label: subject, shape: 'box', color: { background: '#4A90E2', border: '#357ABD', highlight: '#003E80' }, font: { color: '#FFFFFF' } });
            document.getElementById('subject').value = '';
        }

        function addNode() {
            let topic = document.getElementById('topic').value;
            let priority = document.getElementById('priority').value;
            let imageFile = document.getElementById('imageUpload').files[0];
            if (topic.trim() === '') return;

            let color;
            let textColor;
            switch (priority) {
                case 'high':
                    color = { background: '#FF6347', border: '#CC4C39', highlight: '#B22222' };
                    textColor = '#FFFFFF';
                    break;
                case 'medium':
                    color = { background: '#FFD700', border: '#E6C200', highlight: '#B8860B' };
                    textColor = '#000000';
                    break;
                case 'low':
                    color = { background: '#87CEEB', border: '#5DADE2', highlight: '#4682B4' };
                    textColor = '#FFFFFF';
                    break;
            }

            let imgTag = '';
            if (imageFile) {
                let reader = new FileReader();
                reader.onload = function(event) {
                    let wrapper = document.createElement('div');
                    wrapper.className = 'image-wrapper';

                    let imgElement = document.createElement('img');
                    imgElement.src = event.target.result;
                    imgElement.className = 'image-preview';

                    let imgName = document.createElement('div');
                    imgName.className = 'image-name';
                    imgName.textContent = topic;

                    wrapper.appendChild(imgElement);
                    wrapper.appendChild(imgName);
                    document.getElementById('imageContainer').appendChild(wrapper);
                };
                reader.readAsDataURL(imageFile);
                imgTag = '\n(📷 Image Attached)';
            }

            nodes.add({ id: nodeId, label: topic + imgTag, shape: 'ellipse', color: color, font: { color: textColor } });
            edges.add({ from: 1, to: nodeId });
            nodeId++;
            document.getElementById('topic').value = '';
            document.getElementById('imageUpload').value = '';
        }
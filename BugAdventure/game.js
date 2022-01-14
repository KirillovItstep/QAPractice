const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const imageElement = document.getElementById('image');

let state = {}

function startGame() {
  state = {}
  showTextNode(0)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
  imageElement.innerHTML = '';

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('custom-btn');
	  button.classList.add('btn-1');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);	  
    }	
  } 
  )
  const image = document.createElement('img');
  image.setAttribute('src', 'images/'+textNode.image);
   imageElement.appendChild(image);
} 

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
{
    id: 0,
	image:'development.jpg',
    text: 'The development of new software in a process...\nBugs life cycle is beginning.',
    options: [
      {
        text: 'Test the software',       
        nextText: 1
      }
    ]
  },
  {
    id: 1,
	image:'found.jpg',
    text: 'Tester. While testing the program, the tester found a bug.',
    options: [
      {
        text: 'Submit a bug report',       
        nextText: 2
      },
      {
        text: 'Find the next bug',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'Tester lead. The bag is assigned a status as NEW.',
	image:'teamlead.jpg',
    options: [
      {
        text: 'Assign to developer',       
        nextText: 5
      },      
      {
        text: 'Ignore the bug',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Bug lost.',
	image:'lost.jpg',
    options: [
      {
        text: 'Return',
        nextText: 1
      }
    ]
  }, 
  {
    id: 5,
	image:'developer.jpg',
    text: 'Developer. The developer starts analyzing and works on the defect fix',
    options: [
      {
        text: 'Fix the bug',
        nextText: 6
      },
	  {
        text: 'Duplicated',
        nextText: 10
      },
	  {
        text: 'Rejected',
        nextText: 9
      },
	  {
        text: 'Deffered',
        nextText: 11
      },
	   {
        text: 'Not a bug',
        nextText: 12
      }
    ]
  },
  
  {
    id: 6,
	image:'fix.jpg',
    text: 'Developer. Pending retest: the developer gives a particular code for retesting the code to the tester.',
    options: [
      {
        text: 'Waiting',
        nextText: 3
      },
	  {
        text: 'Save the code in CVS',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
	image:'retest.jpg',
    text: 'Tester. Tester does the retesting of the code. Bug status is \'Re-test\'',
    options: [
      {
        text: 'Reopened',
        nextText: 5
      },
      {
        text: 'Verified',        
        nextText: 8
      }
    ]
  },
  {
    id: 8,
	image:'closed.jpg',
    text: 'Success - The bug is closed!',
    options: [
      {
        text: 'Restart',
        nextText: 0
      }
    ]
  },
  {
    id: 9,
	image:'rejected.jpg',
    text: 'Rejected. Look at the problem more carefully',
    options: [
      {
        text: 'Restart',
        nextText: 1
      }
    ]
  },
  {
    id: 10,
	image:'duplicated.jpg',
    text: 'This bag is duplicated.',
    options: [
      {
        text: 'Restart',
        nextText: 1
      }
    ]
  },
  {
    id: 11,
	image:'deffered.jpg',
    text: 'The bug is insignificant and expensive for fixing.',
	options: [
      {
        text: 'Restart',
        nextText: 1
      }
    ]
  },
  {
    id: 12,
	image:'feature.jpg',
    text: 'It is not bug, but the new feature!',
	options: [
      {
        text: 'Restart',
        nextText: 1
      }
    ]
  }
]

startGame()